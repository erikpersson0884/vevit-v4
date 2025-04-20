import { createVevService} from "../services/vevService";
import { Request, Response } from "express";
import { IVevController } from "../models/controllers/IVevController";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { NotAllowedToUpdateError } from "../errors/NotAllowedToUpdateError";

const vevService = createVevService();

export const createVevController = (service = vevService): IVevController => ({
    getAllVevs: async (req: Request, res: Response): Promise<void> => {
        const vevs = await service.getAllVevs();
        res.status(200).json(vevs);
    },

    createVev: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        let { challengedId, date, reason } = req.body;
        const challengerId = req.user.id; // Assuming the user ID is stored in req.userId after authentication
        
        if (!challengerId || !challengedId || !date || !reason) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }
        
        date = new Date(date);

        const vev = await service.createVev(challengerId, challengedId, date, reason);
        res.status(201).json(vev);
    },

    getVevById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const vev = await service.getVevById(id);
        if (!vev) {
            res.status(404).json({ error: "Vev not found" });
            return;
        }
        res.status(200).json(vev);
    },

    updateVev: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const { challengerId, challengedId, date } = req.body;
        const vev = await service.updateVev(id, challengerId, challengedId, date);
        if (!vev) {
            res.status(404).json({ error: "Vev not found" });
            return;
        }
        res.status(200).json(vev);
    },

    setVevWinner: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const { winnerId } = req.body;

        if (!service.checkIfUserInVev(req.user.id, id)) {
            throw new NotAllowedToUpdateError(`User with id ${winnerId} is not part of the Vev with id ${id} and therefore cannot set a winner`);
        }

        const vev = await service.setVevWinner(id, winnerId);

        res.status(200).json(vev);
    },

    deleteVev: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const vev = await service.deleteVev(id);
        if (!vev) {
            res.status(404).json({ error: `Vev not found, id: ${id}` });
            return;
        }
        res.status(200).json(vev);
    },
});

export default createVevController;
