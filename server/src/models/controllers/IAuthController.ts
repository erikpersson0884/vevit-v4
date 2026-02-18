import { NextFunction, Request, Response } from "express";

export default interface IAuthController {
    login: (req: Request, res: Response) => Promise<void>;
    startGammaLogin: (req: Request, res: Response) => Promise<void>;
    handleGammaCallback: (req: Request, res: Response) => Promise<void>;
}
