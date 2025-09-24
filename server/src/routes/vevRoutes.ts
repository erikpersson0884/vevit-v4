import express from "express";
import { createVevController } from "../controllers/vevController.js";
import { strictAuth, optionalAuth } from "../middleware/authMiddleware.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { GetVevsPaginatedSchema, CreateVevSchema, UpdateVevSchema, UpdateVevWinnerSchema } from "../models/dtos/VevDTO.js";

const router = express.Router();
const vevController = createVevController();


router.get("/", validateRequest(GetVevsPaginatedSchema), optionalAuth, (req, res) => {
    vevController.getVevsPaginated(req, res);
});
router.get("/:id", vevController.getVevById);

router.post("/", validateRequest(CreateVevSchema), strictAuth, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.createVev(authenticatedReq, res);
});

router.patch("/:id", validateRequest(UpdateVevSchema), strictAuth, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.updateVev(authenticatedReq, res);
});

router.patch("/winner/:id", validateRequest(UpdateVevWinnerSchema), strictAuth, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.setVevWinner(authenticatedReq, res);
});

router.delete("/:id", strictAuth, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.deleteVev(authenticatedReq, res);
});

export default router;
