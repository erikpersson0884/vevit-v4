import express from "express";
import { createVevController } from "../controllers/vevController";
import authMiddleware from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

const router = express.Router();
const vevController = createVevController();


router.get("/", vevController.getAllVevs);
router.get("/:id", vevController.getVevById);

router.post("/", authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.createVev(authenticatedReq, res);
});

router.patch("/:id", authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.updateVev(authenticatedReq, res);
});

router.patch("/winner/:id", authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.setVevWinner(authenticatedReq, res);
});

router.delete("/:id", authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.deleteVev(authenticatedReq, res);
});

export default router;
