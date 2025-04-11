import express from "express";
import { createUserController} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

const userController = createUserController();

router.get("/me", authMiddleware, userController.getCurrentUser); // Assuming you want to get the current user's info
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById); // Assuming you want to get a user by ID
router.post("/", userController.createUser);
router.patch("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;
