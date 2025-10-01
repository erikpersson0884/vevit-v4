import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import AchievementService from "../../services/achievementService.js";
import ACHIEVEMENTS from "../../achievements/achievements.js";
import IVevRepository from "../../models/repositories/IVevRepository.js";
import IAchievementsRepository from "../../models/repositories/IAchievementsRepository.js";

// Mock repositories
const mockVevRepository = {
    findAllWhereUserIsChallenger: vi.fn(),
    findAllWhereUserIsChallenged: vi.fn(),
    findAllPastVevsByUserId: vi.fn(),
    findById: vi.fn(),
    countVevsByUserId: vi.fn(),
    countAll: vi.fn(),
    countVevsWonByUserId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findAllByUserId: vi.fn(),
    findAllPastVevs: vi.fn(),
} as unknown as Mocked<IVevRepository>;

const mockAchievementRepository = {
    hasUserAchievement: vi.fn(),
    awardAchievementToUser: vi.fn(),
    getAllAchievements: vi.fn(),
    getUserAchievements: vi.fn(),
} as unknown as Mocked<IAchievementsRepository>;

describe("AchievementService", () => {
    let service: AchievementService;
    const userId = "user123";

    beforeEach(() => {
        vi.clearAllMocks();
        service = new AchievementService(
        mockVevRepository as any,
        mockAchievementRepository as any
        );
    });

    it("should return all achievements", async () => {
        const allAchievements = Object.values(ACHIEVEMENTS).map(a => ({
            name: a.name,
            id: a.id,
            description: a.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        mockAchievementRepository.getAllAchievements.mockResolvedValue(allAchievements);
        const achievements = await service.getAllAchievements();
        expect(achievements).toEqual(allAchievements);
    });

    describe("awardAchievement", () => {
        it("should award an achievement if user doesn't have it", async () => {
        mockAchievementRepository.hasUserAchievement.mockResolvedValue(false);

        // @ts-ignore - accessing private method for test
        await service["awardAchievement"](userId, "ACH_ID");

        expect(mockAchievementRepository.hasUserAchievement).toHaveBeenCalledWith(
            userId,
            "ACH_ID"
        );
        expect(
            mockAchievementRepository.awardAchievementToUser
        ).toHaveBeenCalledWith(userId, "ACH_ID");
        });

        it("should not award an achievement if user already has it", async () => {
        mockAchievementRepository.hasUserAchievement.mockResolvedValue(true);

        // @ts-ignore - accessing private method for test
        await service["awardAchievement"](userId, "ACH_ID");

        expect(
            mockAchievementRepository.awardAchievementToUser
        ).not.toHaveBeenCalled();
        });
    });

    describe("checkChallengerAchievements", () => {
        it("should award CHALLANGE_1_OPPONENT when user has created 1 vev", async () => {
        mockVevRepository.findAllWhereUserIsChallenger.mockResolvedValue([
            {
                id: "vev1",
                challengerId: userId,
                challengedId: "opponent1",
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason",
                winnerId: null
            }
        ]);
        mockAchievementRepository.hasUserAchievement.mockResolvedValue(false);

        // @ts-ignore
        await service["checkChallengerAchievements"](userId);

        expect(mockAchievementRepository.awardAchievementToUser).toHaveBeenCalledWith(
            userId,
            ACHIEVEMENTS.CHALLANGE_1_OPPONENT.id
        );
        });

        it("should not award anything when count is not 1, 10, or 50", async () => {
        mockVevRepository.findAllWhereUserIsChallenger.mockResolvedValue([
            {
                id: "vev1",
                challengerId: userId,
                challengedId: "opponent1",
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason 1",
                winnerId: null
            },
            {
                id: "vev2",
                challengerId: userId,
                challengedId: "opponent2",
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason 2",
                winnerId: null
            },
            {
                id: "vev3",
                challengerId: userId,
                challengedId: "opponent3",
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason 3",
                winnerId: null
            }
        ]);
        // @ts-ignore
        await service["checkChallengerAchievements"](userId);

        expect(mockAchievementRepository.awardAchievementToUser).not.toHaveBeenCalled();
        });
    });

    describe("checkChallengedAchievements", () => {
        it("should award CHALLANGED_BY_10_OPPONENTS when user is challenged by 10", async () => {
        mockVevRepository.findAllWhereUserIsChallenged.mockResolvedValue(
            new Array(10).fill({})
        );
        mockAchievementRepository.hasUserAchievement.mockResolvedValue(false);

        // @ts-ignore
        await service["checkChallengedAchievements"](userId);

        expect(mockAchievementRepository.awardAchievementToUser).toHaveBeenCalledWith(
            userId,
            ACHIEVEMENTS.CHALLANGED_BY_10_OPPONENTS.id
        );
        });
    });

    describe("checkWinnerAchievements", () => {
        it("should award WIN_1_VEV when user wins exactly 1 vev", async () => {
        mockVevRepository.findAllPastVevsByUserId.mockResolvedValue([
            {
                id: "vev1",
                challengerId: userId,
                challengedId: "opponent1",
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason 1",
                winnerId: userId
            },
            {
                id: "vev2",
                challengerId: "other",
                challengedId: userId,
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason 2",
                winnerId: "other"
            }
        ]);
        mockAchievementRepository.hasUserAchievement.mockResolvedValue(false);

        // @ts-ignore
        await service["checkWinnerAchievements"](userId);

        expect(mockAchievementRepository.awardAchievementToUser).toHaveBeenCalledWith(
            userId,
            ACHIEVEMENTS.WIN_1_VEV.id
        );
        });

        it("should not award when user has no wins", async () => {
        mockVevRepository.findAllPastVevsByUserId.mockResolvedValue([
            {
                id: "vev1",
                challengerId: "other",
                challengedId: userId,
                date: new Date(),
                bookedDate: new Date(),
                reason: "Test reason",
                winnerId: "other"
            },
        ]);

        // @ts-ignore
        await service["checkWinnerAchievements"](userId);

        expect(mockAchievementRepository.awardAchievementToUser).not.toHaveBeenCalled();
        });
    });

    describe("checkAndAwardAchievements", () => {
        it("should trigger achievement checks through repositories", async () => {
            mockVevRepository.findAllWhereUserIsChallenger.mockResolvedValue([
                {
                    id: "vev1",
                    challengerId: userId,
                    challengedId: "opponent1",
                    date: new Date(),
                    bookedDate: new Date(),
                    reason: "Test reason",
                    winnerId: null
                }
            ]);
            mockVevRepository.findAllWhereUserIsChallenged.mockResolvedValue([
                {
                    id: "vev1",
                    challengerId: "someChallenger",
                    challengedId: userId,
                    date: new Date(),
                    bookedDate: new Date(),
                    reason: "Test reason",
                    winnerId: null
                }
            ]);
            mockVevRepository.findAllPastVevsByUserId.mockResolvedValue([
                {
                    id: "vev1",
                    challengerId: userId,
                    challengedId: "opponent1",
                    date: new Date(),
                    bookedDate: new Date(),
                    reason: "Test reason",
                    winnerId: userId
                }
            ]);
            mockAchievementRepository.hasUserAchievement.mockResolvedValue(false);

            await service.checkAndAwardAchievements(userId);

            // Verify repository calls instead of private spies
            expect(mockVevRepository.findAllWhereUserIsChallenger).toHaveBeenCalledWith(userId);
            expect(mockVevRepository.findAllWhereUserIsChallenged).toHaveBeenCalledWith(userId);
            expect(mockVevRepository.findAllPastVevsByUserId).toHaveBeenCalledWith(userId);

            // And that at least one achievement was attempted
            expect(mockAchievementRepository.awardAchievementToUser).toHaveBeenCalled();
        });
    });

});
