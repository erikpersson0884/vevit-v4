// userController.ts
import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { IUserController } from "../models/controllers/IUserController";

const userService = new UserService();

export const createUserController = (service = userService): IUserController => ({
    getAllUsers: async (req: Request, res: Response) => {
        const users = await service.getAllUsers();
        res.json(users);
    },

    createUser: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await service.createUser(username, password);
        res.json(user);
    },

    getUserById: (req: Request, res: Response) => {
        const userId = req.params.id;
        const user = service.getUserById(userId);
        if (user) res.json(user);
    },

    updateUser: (req: Request, res: Response) => {
        const userId = req.params.id;
        const { username, password } = req.body;
        const user = service.updateUser(userId, username, password);
        if (user) res.json(user);
        else res.status(404).json({ error: `User with id ${userId} not found` });
    },

    deleteUser: (req: Request, res: Response) => {
        const userId: string = req.params.id;
        try { 
            service.deleteUser(userId);
            res.json({ message: `User with id ${userId} deleted` });
        } catch (err) {
            res.status(404).json({ error: `User with id ${userId} not found` });
        }
    },
});
