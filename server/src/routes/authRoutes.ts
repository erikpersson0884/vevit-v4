import { Router } from "express";
import { login } from "../controllers/authController";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

router.post("/login", asyncHandler(login));

export default router;
