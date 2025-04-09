import VevService from "../services/vevService";
import { Request, Response } from "express";
import { IVevController } from "../models/controllers/IVevController";

const vevService = new VevService();

export const createVevController = (service = vevService): IVevController => ({
    getAllVevs: async (req: Request, res: Response): Promise<void> => {
        const vevs = await service.getAllVevs();
        res.status(200).json(vevs);
    },

    createVev: async (req: Request, res: Response): Promise<void> => {
        const { challangerId, challangedId, date, reason } = req.body;
        if (!challangerId || !challangedId || !date || !reason) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }
        
        if (challangerId === challangedId) {
            res.status(400).json({ error: "Challanger and Challanged cannot be the same" });
            return;
        }

        const vev = await service.createVev(challangerId, challangedId, date, reason);
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

    updateVev: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { challangerId, challangedId, date } = req.body;
        const vev = await service.updateVev(id, challangerId, challangedId, date);
        if (!vev) {
            res.status(404).json({ error: "Vev not found" });
            return;
        }
        res.status(200).json(vev);
    },

    deleteVev: async (req: Request, res: Response): Promise<void> => {
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
