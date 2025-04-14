// userController.ts
import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { IUserController } from "../models/controllers/IUserController";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { IUser } from "../models/IUser";

const userService = new UserService();

export const createUserController = (service = userService): IUserController => ({
    getAllUsers: async (req: Request, res: Response) => {
        const users = await service.getAllUsers();
        res.json(users);
    },

    getUserById: async (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = await service.getUserById(userId);
        if (user) res.json(user);
        else res.status(404).json({ error: `User with id ${userId} not found` });
    },

    createUser: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await service.createUser(username, password);
        res.json(user);
    },

    getCurrentUser: (req: AuthenticatedRequest, res: Response) => {
        const user = req.user;
        if (user) res.json(user);
    },

    updateUser: (req: AuthenticatedRequest, res: Response) => {
        const user: IUser = req.user;
        const { username, password } = req.body;
        const updatedUser = service.updateUser(user.id, username, password);
        if (updatedUser) res.json(updatedUser);
        else res.status(404).json({ error: `User with id ${user.id} not found` });
    },

    deleteUser: (req: AuthenticatedRequest, res: Response) => {
        const user: IUser = req.user;
        try { 
            service.deleteUser(user.id);
            res.json({ message: `User with id ${user.id} deleted` });
        } catch (err) {
            res.status(404).json({ error: `User with id ${user.id} not found` });
        }
    },
});
