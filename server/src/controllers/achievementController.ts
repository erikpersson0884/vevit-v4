import { Request, Response } from "express";
import IAchievementsController from "../models/controllers/IAchievementsController.js";
import IAchievementService from "../models/services/IAchievementService.js";
import { AchievementSchema } from "../models/dtos/AchievementDTO.js";
import AchievementService from "../services/achievementService.js";
import { sendValidatedResponse } from "../middleware/validateResponseMiddleware.js";
import { Achievement, UserAchievement } from "@prisma/client";


export class AchievementsController implements IAchievementsController{
    private achievementService: IAchievementService;

    constructor(achievementService: IAchievementService = new AchievementService()) {
        this.achievementService = achievementService;
    }

    public async getAchievementsForUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        
        const achievements: UserAchievement[] = await this.achievementService.getAchievementsForUser(userId);
        console.log(achievements);
        sendValidatedResponse(res, AchievementSchema.array(), achievements);
    }

    public async getAllAchievements(req: Request, res: Response) {
        const achievements = await this.achievementService.getAllAchievements();
        sendValidatedResponse(res, AchievementSchema.array(), achievements);
    }
}
