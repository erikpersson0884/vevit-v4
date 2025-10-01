
export default interface IAchievementService {
    checkAndAwardAchievements(userId: string): Promise<void>;
}
