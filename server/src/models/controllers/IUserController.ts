import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest'; 

export interface IUserController {
    getAllUsers: (req: Request, res: Response) => void;
    getUserById: (req: Request, res: Response) => void;
    createUser: (req: Request, res: Response) => void;
    getCurrentUser: (req: AuthenticatedRequest, res: Response) => void;
    updateUser: (req: Request, res: Response) => void;
    deleteUser: (req: Request, res: Response) => void;
}

export default IUserController;