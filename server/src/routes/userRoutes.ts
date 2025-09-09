import express from "express";
import { createUserController } from "../controllers/userController";
import { Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { validateRequest } from "../middleware/validateRequestMiddleware";
import { CreateUserSchema, UpdateUserSchema } from "../models/dtos/UserDTOs";

const router = express.Router();

const userController = createUserController();

// Get information about the currently authenticated user
router.get("/me", authMiddleware, (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    userController.getCurrentUser(authenticatedReq, res);
});

// Get all users or a specific user by ID
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

// Create a new user
router.post("/", validateRequest(CreateUserSchema), userController.createUser);

// Update a user by ID (requires authentication)
router.patch("/:id", authMiddleware, validateRequest(UpdateUserSchema), (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    userController.updateUser(authenticatedReq, res);
});

// Delete a user by ID (requires authentication)
router.delete("/:id", authMiddleware, (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    userController.deleteUser(authenticatedReq, res);
});

export default router;
