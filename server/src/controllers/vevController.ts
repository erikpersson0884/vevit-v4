import VevService from "../services/vevService";

import { Request, Response } from "express";

import { IVevController } from "../models/controllers/IVevController";
import { IVev } from "../models/IVev";

export class VevController implements IVevController {
    private vevService: VevService;

    constructor(vevService: VevService) {
        this.vevService = vevService;
    }

    public getAllVevs = async (req: Request, res: Response): Promise<void> => {
        try {
            const vevs = await this.vevService.getAllVevs();
            res.status(200).json(vevs);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    public createVev = async (req: Request, res: Response): Promise<void> => {
        try {
            const { challangerId, challangedId, date } = req.body;
            const vev = await this.vevService.createVev(challangerId, challangedId, date);
            res.status(201).json(vev);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    public getVevById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const vev = await this.vevService.getVevById(id);
            if (!vev) {
                res.status(404).json({ error: "Vev not found" });
                return;
            }
            res.status(200).json(vev);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    public updateVev = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { challangerId, challangedId, date } = req.body;
            const vev = await this.vevService.updateVev(id, challangerId, challangedId, date);
            if (!vev) {
                res.status(404).json({ error: "Vev not found" });
                return;
            }
            res.status(200).json(vev);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

    public deleteVev = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const vev = await this.vevService.deleteVev(id);
            if (!vev) {
                res.status(404).json({ error: `Vev not found, id: ${id}` });
                return;
            }
            res.status(200).json(vev);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    };

}

export function createVevController(vevService: VevService): IVevController {
    return new VevController(vevService);
}

export default VevController;
