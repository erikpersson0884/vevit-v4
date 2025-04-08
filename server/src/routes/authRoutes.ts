import { Router } from "express";
import { login, register, protectedRoute } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authenticateToken, protectedRoute);

export default router;
