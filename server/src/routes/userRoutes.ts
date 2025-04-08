import express from "express";
import { createUserController} from "../controllers/userController";

const router = express.Router();

const userController = createUserController();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
