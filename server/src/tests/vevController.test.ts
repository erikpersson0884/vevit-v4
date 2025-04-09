import { Request, Response } from "express";

import { IVevService } from "../models/services/IVevService";
import { createVevController } from "../controllers/vevController";
import { IVev } from "../models/IVev";

const mockService: IVevService = {
    getAllVevs: jest.fn(),
    createVev: jest.fn(),
    getVevById: jest.fn(),
    updateVev: jest.fn(),
    deleteVev: jest.fn(),
};

const {
    getAllVevs,
    createVev,
    getVevById,
    updateVev,
    deleteVev,
} = createVevController(mockService as any);

const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("Vev Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get all vevs", async () => {
        const req = {} as Request;
        const res = mockRes();
        const mockVevs: IVev[] = [{id: "1", challengerId: "challenger1", challengedId: "challenged1", date: new Date(), bookedDate: new Date()}];

        (mockService.getAllVevs as jest.Mock).mockResolvedValue(mockVevs);

        await getAllVevs(req, res);

        expect(mockService.getAllVevs).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockVevs);
    });

    it("should create a vev", async () => {
        const req = {
            body: {
                challengerId: "challenger1",
                challengedId: "challenged1",
                date: new Date(),
            },
        } as Request;
        const res = mockRes();
        const mockVev: IVev = {id: "1", challengerId: "challenger1", challengedId: "challenged1", date: new Date(), bookedDate: new Date()};

        (mockService.createVev as jest.Mock).mockResolvedValue(mockVev);

        await createVev(req, res);

        expect(mockService.createVev).toHaveBeenCalledWith(req.body.challengerId, req.body.challengedId, req.body.date);        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockVev);
    });

    it("should not create a vev if service fails", async () => {
        const req = {
            body: {
                challengerId: "challenger1",
                challengedId: "challenged1",
                date: new Date(),
            },
        } as Request;
        const res = mockRes();

        (mockService.createVev as jest.Mock).mockRejectedValue(new Error("Service error"));

        await createVev(req, res);

        expect(mockService.createVev).toHaveBeenCalledWith(req.body.challengerId, req.body.challengedId, req.body.date);        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });

    it("should get a vev by ID", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockRes();
        const mockVev: IVev = {id: "1", challengerId: "challenger1", challengedId: "challenged1", date: new Date(), bookedDate: new Date()};

        (mockService.getVevById as jest.Mock).mockResolvedValue(mockVev);

        await getVevById(req, res);

        expect(mockService.getVevById).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockVev);
    });

    it("should return 404 if vev not found", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockRes();

        (mockService.getVevById as jest.Mock).mockResolvedValue(null);

        await getVevById(req, res);

        expect(mockService.getVevById).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Vev not found" });
    });

    it("should update a vev", async () => {
        const req = {
            params: { id: "1" },
            body: {
                challengerId: "challenger1",
                challengedId: "challenged1",
                date: new Date(),
            },
        } as unknown as Request;
        const res = mockRes();
        const mockVev: IVev = {id: "1", challengerId: "challenger1", challengedId: "challenged1", date: new Date(), bookedDate: new Date()};

        (mockService.updateVev as jest.Mock).mockResolvedValue(mockVev);

        await updateVev(req, res);

        expect(mockService.updateVev).toHaveBeenCalledWith(req.params.id, req.body.challengerId, req.body.challengedId, req.body.date);        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockVev);
    });

    it("should return 404 if vev not found for update", async () => {
        const req = {
            params: { id: "1" },
            body: {
                challengerId: "challenger1",
                challengedId: "challenged1",
                date: new Date(),
            },
        } as unknown as Request;
        const res = mockRes();

        (mockService.updateVev as jest.Mock).mockResolvedValue(null);

        await updateVev(req, res);

        expect(mockService.updateVev).toHaveBeenCalledWith(req.params.id, req.body.challengerId, req.body.challengedId, req.body.date);        
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Vev not found" });
    });

    it("should delete a vev", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockRes();
        const mockVev: IVev = {id: "1", challengerId: "challenger1", challengedId: "challenged1", date: new Date(), bookedDate: new Date()};

        (mockService.deleteVev as jest.Mock).mockResolvedValue(mockVev);

        await deleteVev(req, res);

        expect(mockService.deleteVev).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockVev);
    });

    it("should return a 404 if vev not found for delete", async () => {
        const vevId = 3;
        const req = { params: { id: vevId } } as unknown as Request;
        const res = mockRes();

        (mockService.deleteVev as jest.Mock).mockResolvedValue(null);
        await deleteVev(req, res);

        expect(mockService.deleteVev).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: `Vev not found, id: ${vevId}` });
    });
    
    it("should return 500 if delete service fails", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockRes();

        (mockService.deleteVev as jest.Mock).mockRejectedValue(new Error("Service error"));

        await deleteVev(req, res);

        expect(mockService.deleteVev).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });

});
