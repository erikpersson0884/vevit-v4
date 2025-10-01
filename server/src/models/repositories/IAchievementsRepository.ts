
export default interface IAchievementsRepository {
    awardAchievementToUser(userId: string, achievementId: string): Promise<void>;
    hasUserAchievement(userId: string, achievementId: string): Promise<boolean>;
    getUserAchievements(userId: string): Promise<string[]>;
}