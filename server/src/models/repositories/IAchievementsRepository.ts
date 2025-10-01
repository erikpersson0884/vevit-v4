import { UserAchievement, Achievement } from "@prisma/client";


export default interface IAchievementsRepository {
    awardAchievementToUser(userId: string, achievementId: string): Promise<void>;
    hasUserAchievement(userId: string, achievementId: string): Promise<boolean>;
    getUserAchievements(userId: string): Promise<UserAchievement[]>;
    getAllAchievements(): Promise<Achievement[]>;
}