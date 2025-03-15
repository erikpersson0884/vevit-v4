import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const getAllUsers = (req: Request, res: Response) => {
    res.json(userService.getAllUsers());
};

export const createUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.json(userService.createUser(username, password));
};

export const getUserById = (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const user = userService.getUserById(userId);
    if (user) res.json(user);
    else res.status(404).json({ error: `User with id ${userId} not found` });
};

export const updateUser = (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const { username, password } = req.body;
    const user = userService.updateUser(userId, username, password);
    if (user) res.json(user);
    else res.status(404).json({ error: `User with id ${userId} not found` });
};

export const deleteUser = (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const user = userService.deleteUser(userId);
    if (user) res.json({ message: `User with id ${userId} deleted`});
    else res.status(404).json({ error: `User with id ${userId} not found` });
};
