import { Achievement, User } from "@prisma/client";
import IVevRepository from "../models/repositories/IVevRepository.js";
import VevRepository from "../repositories/vevRepository.js";

export async function meetsAchievementCondition(
    achievement: Achievement,
    userId: string,
    vevRepo: IVevRepository = new VevRepository()
): Promise<boolean> {
    if (achievement.category === "book_vev") {
        const bookedVevs = await vevRepo.countVevsCreatedByUserId(userId);
        return achievement.threshold !== null && bookedVevs >= achievement.threshold;
    }

    if (achievement.category === "challenged") {
        const challengedCount = await vevRepo.countVevsChallengedToUserId(userId);
        return achievement.threshold !== null && challengedCount >= achievement.threshold;
    }

    if (achievement.category === "wins") {
        const wins = await vevRepo.countVevsWonByUserId(userId);
        return achievement.threshold !== null && wins >= achievement.threshold;
    }

    return false;
}
