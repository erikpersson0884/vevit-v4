import { Request, Response } from 'express';

export default interface IAchievementsController {
    getAchievementsForUser(req: Request, res: Response): Promise<void>;
    getAllAchievements(req: Request, res: Response): Promise<void>;
}