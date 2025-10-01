import { UserAchievement, Achievement } from "@prisma/client";

export default interface IAchievementService {
    checkAndAwardAchievements(userId: string): Promise<void>;
    getAchievementsForUser(userId: string): Promise<UserAchievement[]>;
    getAllAchievements(): Promise<Achievement[]>;
}
