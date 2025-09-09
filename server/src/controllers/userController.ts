import { Request, Response } from "express";
import { createUserService } from "../services/userService";
import { IUserController } from "../models/controllers/IUserController";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { IUser } from "../models/IUser";
import { UserResponseSchema, UserResponseArraySchema } from '../models/dtos/UserDTOs';
import { sendValidatedResponse } from "../middleware/validateResponseMiddleware";

const userService = createUserService();

export const createUserController = (service = userService): IUserController => ({
    getAllUsers: async (req: Request, res: Response) => {
        const users: IUser[] = await service.getAllUsers();
        sendValidatedResponse(res, UserResponseArraySchema, users);
    },

    getUserById: async (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user: IUser | null = await service.getUserById(userId);
        if (user) {
            sendValidatedResponse(res, UserResponseSchema, user);
        }
        else res.status(404).json({ error: `User with id ${userId} not found` });
    },

    getCurrentUser: (req: AuthenticatedRequest, res: Response) => {
        const user: IUser = req.user;
        if (user) sendValidatedResponse(res, UserResponseSchema, user);
    },

    createUser: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await service.createUser(username, password);
        sendValidatedResponse(res, UserResponseSchema, user);
    },

    updateUser: async (req: AuthenticatedRequest, res: Response) => {
        const authUser: IUser = req.user;
        let { username, password, userId }: { username?: string, password?: string, userId?: string } = req.body;
        if (!userId) userId = authUser.id;
        if (authUser.id !== userId && authUser.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Only admins can update other users' });
        }

        const updatedUser: IUser | null = await service.updateUser(userId, username, password);

        if (updatedUser) sendValidatedResponse(res, UserResponseSchema, updatedUser);
        else res.status(404).json({ error: `User with id ${userId} not found` });
    },

    deleteUser: async (req: AuthenticatedRequest, res: Response) => {
        const user: IUser = req.user;
        try {
            await service.deleteUser(user.id);
            res.json({ message: `User with id ${user.id} deleted` });
        } catch (err) {
            res.status(404).json({ error: `User with id ${user.id} not found` });
        }
    },
});
