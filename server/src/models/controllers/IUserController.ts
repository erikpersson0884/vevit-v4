import { Request, Response } from 'express';

export interface IUserController {
    getAllUsers: (req: Request, res: Response) => void;
    createUser: (req: Request, res: Response) => void;
    getUserById: (req: Request, res: Response) => void;
    updateUser: (req: Request, res: Response) => void;
    deleteUser: (req: Request, res: Response) => void;
}

export default IUserController;