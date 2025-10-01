import { Router, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { AchievementsController } from "../controllers/achievementController.js";

const router = Router();

const achievementsController = new AchievementsController();


router.get("/", asyncHandler(async (req: Request, res: Response) => {
    return achievementsController.getAllAchievements(req, res);
}));

router.get("/:id", asyncHandler(async (req: Request, res: Response) => {
    return achievementsController.getAchievementsForUser(req, res);
}));


export default router;
