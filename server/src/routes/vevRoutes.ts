import express from "express";
import { getAllVevs, createVev } from "../controllers/vevController";

const router = express.Router();

router.get("/", getAllVevs);
router.post("/", createVev);

export default router;
