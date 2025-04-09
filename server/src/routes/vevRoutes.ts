import express from "express";
import { createVevController } from "../controllers/vevController";

const router = express.Router();
const vevController = createVevController();

router.get("/", vevController.getAllVevs);
router.post("/", vevController.createVev);

export default router;
