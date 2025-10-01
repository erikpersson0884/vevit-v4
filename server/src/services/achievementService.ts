import ACHIEVEMENTS from "../achievements/achievements.js";
import IVevRepository from "../models/repositories/IVevRepository.js";
import IAchievementService from "../models/services/IAchievementService.js";
import VevRepository from "../repositories/vevRepository.js";
import AchievementRepository from "../repositories/achievementRepository.js";
import IAchievementRepository from "../models/repositories/IAchievementsRepository.js";
import { Achievement, UserAchievement } from "@prisma/client";


export class AchievementService implements IAchievementService {
    private vevRepository: VevRepository;
    private achievementRepository: IAchievementRepository;


    constructor(vevRepository: VevRepository = new VevRepository(), achievementRepository: IAchievementRepository = new AchievementRepository()) {
        this.vevRepository = vevRepository;
        this.achievementRepository = achievementRepository;
    }

    async getAllAchievements(): Promise<Achievement[]> {
        return this.achievementRepository.getAllAchievements();
    }

    async getAchievementsForUser(userId: string): Promise<UserAchievement[]> {
        return this.achievementRepository.getUserAchievements(userId);
    }

    private async awardAchievement(userId: string, achievementId: string): Promise<void> {
        const hasAchievement = await this.achievementRepository.hasUserAchievement(userId, achievementId);
        if (!hasAchievement) {
            await this.achievementRepository.awardAchievementToUser(userId, achievementId);
        }
    }
    
    async checkAndAwardAchievements(userId: string): Promise<void> {
        await this.checkChallengerAchievements(userId);
        await this.checkChallengedAchievements(userId);
        await this.checkWinnerAchievements(userId);
    }

    private async checkChallengerAchievements(userId: string): Promise<void> {
        const vevsCreatedByUser = this.vevRepository.findAllWhereUserIsChallenger(userId);
        const count = (await vevsCreatedByUser).length;
        switch (count) {
            case 1:
                this.awardAchievement(userId, ACHIEVEMENTS.CHALLANGE_1_OPPONENT.id);
                break;
            case 10:
                this.awardAchievement(userId, ACHIEVEMENTS.CHALLANGE_10_OPPONENTS.id);
                break;
            case 50:
                this.awardAchievement(userId, ACHIEVEMENTS.CHALLANGE_50_OPPONENTS.id);
                break;
            default:
                // No achievement to award
                break;
        }
    }

    private async checkChallengedAchievements(userId: string): Promise<void> {
        const vevsChallengedToUser = this.vevRepository.findAllWhereUserIsChallenged(userId);
        const count = (await vevsChallengedToUser).length;
        switch (count) {
            case 1:
                this.awardAchievement(userId, ACHIEVEMENTS.CHALLANGED_BY_1_OPPONENT.id);
                break;
            case 10:
                this.awardAchievement(userId, ACHIEVEMENTS.CHALLANGED_BY_10_OPPONENTS.id);
                break;
            case 50:
                this.awardAchievement(userId, ACHIEVEMENTS.CHALLANGED_BY_50_OPPONENTS.id);
                break;
            default:
                // No achievement to award
                break;
        }
    }

    private async checkWinnerAchievements(userId: string): Promise<void> {
        const vevsWonByUser = this.vevRepository.findAllPastVevsByUserId(userId);
        const count = (await vevsWonByUser).filter(vev => vev.winnerId === userId).length;
        switch (count) {
            case 1:
                this.awardAchievement(userId, ACHIEVEMENTS.WIN_1_VEV.id);
                break;
            case 10:
                this.awardAchievement(userId, ACHIEVEMENTS.WIN_10_VEVS.id);
                break;
            case 50:
                this.awardAchievement(userId, ACHIEVEMENTS.WIN_50_VEVS.id);
                break;
            default:
                // No achievement to award
                break;
        }
    }
}

export default AchievementService;