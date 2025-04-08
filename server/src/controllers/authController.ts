import { Request, Response } from "express";
import AuthService from "../services/authService";

export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    await AuthService.registerUser(username, password);
    res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const token = await AuthService.loginUser(username, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export function protectedRoute(req: Request, res: Response) {
  res.json({ message: "Access granted", user: req.user });
}
