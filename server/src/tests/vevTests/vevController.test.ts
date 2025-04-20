import { createVevController } from "../../controllers/vevController";
import { NotAllowedToUpdateError } from "../../errors/NotAllowedToUpdateError";

// Mock the dependencies
const mockService = {
    getAllVevs: jest.fn(),
    createVev: jest.fn(),
    getVevById: jest.fn(),
    updateVev: jest.fn(),
    setVevWinner: jest.fn(),
    deleteVev: jest.fn(),
    checkIfUserInVev: jest.fn(),
};

const controller = createVevController(mockService as any);

// Mock req and res
const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("VevController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllVevs", () => {
        it("should return all vevs", async () => {
            const vevs = [{ id: "1" }, { id: "2" }];
            mockService.getAllVevs.mockResolvedValue(vevs);

            const req = {} as any;
            const res = mockResponse();

            await controller.getAllVevs(req, res);

            expect(mockService.getAllVevs).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(vevs);
        });
    });

    describe("createVev", () => {
        it("should create a new vev", async () => {
            const vev = { id: "1" };
            mockService.createVev.mockResolvedValue(vev);

            const req = {
                body: {
                    challengedId: "challenged-id",
                    date: new Date().toISOString(),
                    reason: "Test reason",
                },
                user: { id: "challenger-id" },
            } as any;
            const res = mockResponse();

            await controller.createVev(req, res);

            expect(mockService.createVev).toHaveBeenCalledWith(
                "challenger-id",
                "challenged-id",
                expect.any(Date),
                "Test reason"
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(vev);
        });

        it("should return 400 if fields are missing", async () => {
            const req = {
                body: {},
                user: { id: "challenger-id" },
            } as any;
            const res = mockResponse();

            await controller.createVev(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
        });
    });

    describe("getVevById", () => {
        it("should return vev by id", async () => {
            const vev = { id: "1" };
            mockService.getVevById.mockResolvedValue(vev);

            const req = { params: { id: "1" } } as any;
            const res = mockResponse();

            await controller.getVevById(req, res);

            expect(mockService.getVevById).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(vev);
        });

        it("should return 404 if vev not found", async () => {
            mockService.getVevById.mockResolvedValue(null);

            const req = { params: { id: "1" } } as any;
            const res = mockResponse();

            await controller.getVevById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Vev not found" });
        });
    });

    describe("updateVev", () => {
        it("should update vev", async () => {
            const updatedVev = { id: "1" };
            mockService.updateVev.mockResolvedValue(updatedVev);

            const req = {
                params: { id: "1" },
                body: { challengerId: "c1", challengedId: "c2", date: new Date() },
            } as any;
            const res = mockResponse();

            await controller.updateVev(req, res);

            expect(mockService.updateVev).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedVev);
        });

        it("should return 404 if vev not found", async () => {
            mockService.updateVev.mockResolvedValue(null);

            const req = {
                params: { id: "1" },
                body: { challengerId: "c1", challengedId: "c2", date: new Date() },
            } as any;
            const res = mockResponse();

            await controller.updateVev(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Vev not found" });
        });
    });

    describe("setVevWinner", () => {
        it("should set vev winner if user is in vev", async () => {
            const vev = { id: "1", winnerId: "winner-id" };
            mockService.checkIfUserInVev.mockReturnValue(true);
            mockService.setVevWinner.mockResolvedValue(vev);

            const req = {
                params: { id: "1" },
                body: { winnerId: "winner-id" },
                user: { id: "user-id" },
            } as any;
            const res = mockResponse();

            await controller.setVevWinner(req, res);

            expect(mockService.checkIfUserInVev).toHaveBeenCalledWith("user-id", "1");
            expect(mockService.setVevWinner).toHaveBeenCalledWith("1", "winner-id");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(vev);
        });

        it("should throw NotAllowedToUpdateError if user not in vev", async () => {
            mockService.checkIfUserInVev.mockReturnValue(false);

            const req = {
                params: { id: "1" },
                body: { winnerId: "winner-id" },
                user: { id: "user-id" },
            } as any;
            const res = mockResponse();

            await expect(controller.setVevWinner(req, res)).rejects.toThrow(NotAllowedToUpdateError);

            expect(mockService.checkIfUserInVev).toHaveBeenCalledWith("user-id", "1");
        });
    });

    describe("deleteVev", () => {
        it("should delete vev", async () => {
            const deletedVev = { id: "1" };
            mockService.deleteVev.mockResolvedValue(deletedVev);

            const req = { params: { id: "1" } } as any;
            const res = mockResponse();

            await controller.deleteVev(req, res);

            expect(mockService.deleteVev).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(deletedVev);
        });

        it("should return 404 if vev not found", async () => {
            mockService.deleteVev.mockResolvedValue(null);

            const req = { params: { id: "1" } } as any;
            const res = mockResponse();

            await controller.deleteVev(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: `Vev not found, id: 1` });
        });
    });
});
