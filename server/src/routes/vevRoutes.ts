import express from "express";
import { createVevController } from "../controllers/vevController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
const vevController = createVevController();

router.get("/", vevController.getAllVevs);
router.post("/", authMiddleware, vevController.createVev);
router.get("/:id", vevController.getVevById);
router.patch("/:id", authMiddleware, vevController.updateVev);
router.delete("/:id", authMiddleware, vevController.deleteVev);

export default router;
