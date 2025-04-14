import express from "express";
import { createUserController } from "../controllers/userController";
import { Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

const router = express.Router();

const userController = createUserController();
router.get("/me", authMiddleware, (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    userController.getCurrentUser(authenticatedReq, res);
});
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById); 

router.post("/", userController.createUser);

router.patch("/:id", authMiddleware, (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    userController.updateUser(authenticatedReq, res);
});

router.delete("/:id", authMiddleware, (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    userController.deleteUser(authenticatedReq, res);
});

export default router;
