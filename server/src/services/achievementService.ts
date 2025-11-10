import AchievementRepository from "../repositories/achievementRepository.js";
import IAchievementService from "../models/services/IAchievementService.js";
import { Achievement, UserAchievement } from "@prisma/client";
import { meetsAchievementCondition } from "../achievements/achievementConditions.js";


export class AchievementService implements IAchievementService {
    private achievementRepository: AchievementRepository;

    constructor(
        achievementRepository: AchievementRepository = new AchievementRepository(),
    ) {
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
        const achievements: Achievement[] = await this.achievementRepository.getAllAchievements();

        for (const achievement of achievements) {
            if (await meetsAchievementCondition(achievement, userId)) {
                await this.awardAchievement(userId, achievement.id);
            }
        }
    }
}
