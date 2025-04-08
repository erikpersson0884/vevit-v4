// userController.ts
import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { IUserController } from "../models/controllers/IUserController";

const userService = new UserService();

export const createUserController = (service = userService): IUserController => ({
  getAllUsers: (req: Request, res: Response) => {
    res.json(service.getAllUsers());
  },

  createUser: (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.json(service.createUser(username, password));
  },

  getUserById: (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const user = service.getUserById(userId);
    if (user) res.json(user);
    else res.status(404).json({ error: `User with id ${userId} not found` });
  },

  updateUser: (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const { username, password } = req.body;
    const user = service.updateUser(userId, username, password);
    if (user) res.json(user);
    else res.status(404).json({ error: `User with id ${userId} not found` });
  },

  deleteUser: (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const user = service.deleteUser(userId);
    if (user) res.json({ message: `User with id ${userId} deleted` });
    else res.status(404).json({ error: `User with id ${userId} not found` });
  },
});
