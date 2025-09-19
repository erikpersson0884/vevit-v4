import { createVevController } from "../../controllers/vevController.js";
import { NotAllowedToUpdateError } from "../../errors/NotAllowedToUpdateError.js";
import { describe, it, beforeEach, expect, vi } from 'vitest';
import {IUser } from "../../models/IUser.js";
import { IVev } from "../../models/IVev.js";

// Mock the dependencies
const mockService = {
    getVevsPaginated: vi.fn(),
    getVevsCount: vi.fn(),
    createVev: vi.fn(),
    getVevById: vi.fn(),
    updateVev: vi.fn(),
    setVevWinner: vi.fn(),
    deleteVev: vi.fn(),
    checkIfUserInVev: vi.fn(),
};

const controller = createVevController(mockService as any);


// Mock req and res
const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

const mockUser1: IUser = {
    id: "22222222-2222-2222-2222-222222222222",
    username: "user 1",
    password: "1234",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
};

const mockUser2: IUser = {
    id: "33333333-3333-3333-3333-333333333333",
    username: "user 2",
    password: "1234",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
};
    
const mockVev: IVev = {
    id: "11111111-1111-1111-1111-111111111111",
    challengerId: mockUser1.id,
    challengedId: mockUser2.id,
    date: new Date("2025-01-01T10:00:00Z"),
    bookedDate: new Date("2025-01-02T10:00:00Z"),
    winnerId: null,
    reason: "Test reason"
}
mockService.createVev.mockResolvedValue(mockVev);



describe("VevController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getVevById", () => {
        it("should return a vev if found", async () => {
            mockService.getVevById.mockResolvedValue(mockVev);
            const req = { params: { id: mockVev.id } } as any;
            const res = mockResponse();
            await controller.getVevById(req, res);
            expect(res.status).not.toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: mockVev.id }));
        });

        it("should return 404 if vev not found", async () => {
            mockService.getVevById.mockResolvedValue(null);
            const req = { params: { id: "non-existent-id" } } as any;
            const res = mockResponse();
            await controller.getVevById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Vev not found" });
        });
    });

    describe("createVev", () => {
        it("should create a new vev", async () => {

            const req = {
                body: {
                    challengedId: mockUser2.id,
                    date: new Date().toISOString(),
                    reason: "Test reason",
                },
                user: { id: mockUser1.id },
            } as any;
            const res = mockResponse();

            await controller.createVev(req, res);

            expect(mockService.createVev).toHaveBeenCalledWith(
                mockUser1.id,
                mockUser2.id,
                expect.any(Date),
                "Test reason"
            );
        });
    })

    describe("updateVev", () => {
        it("should update a vev if user is part of it", async () => {
            mockService.getVevById.mockResolvedValue(mockVev);
            mockService.checkIfUserInVev.mockResolvedValue(true);
            const mockUpdatedVev = { ...mockVev, reason: "Updated reason" };
            mockService.updateVev.mockResolvedValue(mockUpdatedVev);
            const req = {
                params: { id: mockVev.id },
                body: { reason: "Updated reason" },
                user: { id: mockUser1.id },
            } as any;
            const res = mockResponse();
            await controller.updateVev(req, res);
            expect(mockService.updateVev).toHaveBeenCalledWith(mockVev.id, undefined, undefined, mockUpdatedVev.reason);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: mockUpdatedVev.id }));
        });
        
        it("should throw an error if user is not part of vev", async () => {
            mockService.getVevById.mockResolvedValue(mockVev);
            mockService.checkIfUserInVev.mockResolvedValue(false);
            const req = {
                params: { id: mockVev.id },
                body: { reason: "Updated reason" },
                user: { id: mockUser1.id },
            } as any;
            const res = mockResponse();
            expect(controller.updateVev(req, res)).rejects.toThrowError(NotAllowedToUpdateError);
            expect(mockService.updateVev).not.toHaveBeenCalled();
        });
    })
});

