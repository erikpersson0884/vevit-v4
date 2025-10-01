import express from "express";
import { createVevController } from "../controllers/vevController.js";
import { strictAuth, optionalAuth } from "../middleware/authMiddleware.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { 
    GetVevsPaginatedSchema, 
    CreateVevSchema, 
    UpdateVevSchema, 
    UpdateVevWinnerSchema 
} from "../models/dtos/VevDTO.js";
import asyncHandler from "../middleware/asyncHandler.js";

import type { Request, Response } from "express";

const router = express.Router();
const vevController = createVevController();



router.get(
    "/", 
    validateRequest(GetVevsPaginatedSchema), 
    optionalAuth, 
    asyncHandler((req: Request, res: Response) => vevController.getVevsPaginated(req, res))
);

// GET /vevs/:id
router.get(
    "/:id",
    asyncHandler((req: Request, res: Response) => vevController.getVevById(req, res))
);

// POST /vevs - create a new vev
router.post(
    "/", 
    validateRequest(CreateVevSchema), 
    strictAuth, 
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return vevController.createVev(authenticatedReq, res);
    })
);

// PATCH /vevs/:id - update vev
router.patch(
    "/:id", 
    validateRequest(UpdateVevSchema), 
    strictAuth, 
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return vevController.updateVev(authenticatedReq, res);
    })
);

// PATCH /vevs/winner/:id - set winner
router.patch(
    "/winner/:id", 
    validateRequest(UpdateVevWinnerSchema), 
    strictAuth, 
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return vevController.setVevWinner(authenticatedReq, res);
    })
);

// DELETE /vevs/:id
router.delete(
    "/:id", 
    strictAuth, 
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return vevController.deleteVev(authenticatedReq, res);
    })
);

export default router;
