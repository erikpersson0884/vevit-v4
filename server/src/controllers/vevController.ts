import { createVevService} from "../services/vevService.js";
import { Request, Response } from "express";
import { IVevController } from "../models/controllers/IVevController.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { NotAllowedToUpdateError } from "../errors/NotAllowedToUpdateError.js";

import sendValidatedResponse from "../middleware/validateResponseMiddleware.js";
import { VevResponseSchema, PaginatedVevsResponseSchema } from "../models/dtos/VevDTO.js";


const defaultService = createVevService();

export const createVevController = (vevService = defaultService): IVevController => ({
    getVevsPaginated: async (req: Request, res: Response): Promise<void> => {
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const sortField = (req.query.sortField as string) || "date";
        const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

        // Map frontend keys to DB fields if necessary
        const orderBy: { field: "date" | "challengerId" | "challengedId"; direction: "asc" | "desc" } = {
            field: sortField as "date" | "challengerId" | "challengedId",
            direction: sortOrder
        };

        const vevs = await vevService.getVevsPaginated(page * limit, limit, orderBy);
        const total = await vevService.getTotalNumberOfVevs();

        const response = {
            vevs,
            page,
            limit,
            total
        }

        sendValidatedResponse(res, PaginatedVevsResponseSchema, response);
    },

    createVev: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        let { challengedId, date: dateString, reason } = req.body;
        const challengerId = req.user.id; // Assuming the user ID is stored in req.userId after authentication
        
        if (!challengerId || !challengedId || !dateString) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }
        
        const date: Date = new Date(dateString);

        const vev = await vevService.createVev(challengerId, challengedId, date, reason);
        sendValidatedResponse(res, VevResponseSchema, vev);
    },

    getVevById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const vev = await vevService.getVevById(id);
        if (!vev) {
            res.status(404).json({ error: "Vev not found" });
            return;
        }
        sendValidatedResponse(res, VevResponseSchema, vev); 
    },

    updateVev: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const { date, winnerId, reason }: {date?: Date, winnerId?: string, reason?: string} = req.body;
        const vev = await vevService.updateVev(id, date, winnerId, reason);
        if (!vev) {
            res.status(404).json({ error: "Vev not found" });
            return;
        }
        sendValidatedResponse(res, VevResponseSchema, vev);
    },

    setVevWinner: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const { winnerId }: { winnerId: string} = req.body;

        if (!vevService.checkIfUserInVev(req.user.id, id)) {
            throw new NotAllowedToUpdateError(`User with id ${winnerId} is not part of the Vev with id ${id} and therefore cannot set a winner`);
        }

        const vev = await vevService.setVevWinner(id, winnerId);

        sendValidatedResponse(res, VevResponseSchema, vev);
    },

    deleteVev: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const vev = await vevService.deleteVev(id);
        if (!vev) {
            res.status(404).json({ error: `Vev not found, id: ${id}` });
            return;
        }
        
        sendValidatedResponse(res, VevResponseSchema, vev);
    },
});

export default createVevController;
