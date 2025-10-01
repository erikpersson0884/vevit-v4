import IAchievementsRepository from "../models/repositories/IAchievementsRepository.js";

import { PrismaClient, UserAchievement, Achievement } from "@prisma/client";

export class AchievementRepository implements IAchievementsRepository {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient = new PrismaClient()) {
        this.prisma = prismaClient;
    }

    async awardAchievementToUser(userId: string, achievementId: string): Promise<void> {
        await this.prisma.userAchievement.create({
            data: {
                userId,
                achievementId,
            },
        });
    }

    async hasUserAchievement(userId: string, achievementId: string): Promise<boolean> {
        const record = await this.prisma.userAchievement.findFirst({
            where: {
                userId: userId,
                achievementId: achievementId,
            },
        });
        return record !== null;
    }

    async getAllAchievements(): Promise<Achievement[]> {
        const records = await this.prisma.achievement.findMany();
        return records;
    }

    async getUserAchievements(userId: string): Promise<UserAchievement[]> {
        const records = await this.prisma.userAchievement.findMany({
            where: { userId },
        });
        return records;
    }
}

export default AchievementRepository;