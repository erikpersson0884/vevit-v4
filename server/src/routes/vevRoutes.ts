import express from "express";
import { createVevController } from "../controllers/vevController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { GetVevsPaginatedSchema, CreateVevSchema, UpdateVevSchema, UpdateVevWinnerSchema } from "../models/dtos/VevDTO.js";

const router = express.Router();
const vevController = createVevController();


router.get("/", validateRequest(GetVevsPaginatedSchema), (req, res) => {
    vevController.getVevsPaginated(req, res);
});
router.get("/:id", vevController.getVevById);

router.post("/", validateRequest(CreateVevSchema), authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.createVev(authenticatedReq, res);
});

router.patch("/:id", validateRequest(UpdateVevSchema), authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.updateVev(authenticatedReq, res);
});

router.patch("/winner/:id", validateRequest(UpdateVevWinnerSchema), authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.setVevWinner(authenticatedReq, res);
});

router.delete("/:id", authMiddleware, (req, res) => {
    const authenticatedReq = req as AuthenticatedRequest; // Explicitly cast req
    vevController.deleteVev(authenticatedReq, res);
});

export default router;
