import { Router } from "express";
import { login } from "../controllers/authController";
// import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);

export default router;
