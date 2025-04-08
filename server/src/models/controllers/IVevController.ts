import { Request, Response } from 'express';

export interface IVevController {
    getAllVevs: (req: Request, res: Response) => void;
    createVev: (req: Request, res: Response) => void;
    getVevById: (req: Request, res: Response) => void;
    updateVev: (req: Request, res: Response) => void;
    deleteVev: (req: Request, res: Response) => void;
}

export default IVevController;