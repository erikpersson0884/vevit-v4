import { describe, it, beforeEach, expect, vi } from 'vitest';

import { createVevController } from "../../controllers/vevController.js";
import { PaginatedVevsResponseSchema } from "../../models/dtos/VevDTO.js";

import { IVevService } from "../../models/services/IVevService.js";
import { IVevController } from "../../models/controllers/IVevController.js";

// Mock the dependencies
const mockService: IVevService = {
    getVevsPaginated: vi.fn(),
    createVev: vi.fn(),
    getVevById: vi.fn(),
    updateVev: vi.fn(),
    setVevWinner: vi.fn(),
    deleteVev: vi.fn(),
    checkIfUserInVev: vi.fn(),
    getTotalNumberOfVevs: vi.fn()
};

// Create controller with the mocked service
const controller: IVevController = createVevController(mockService);

const exampleVevs = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        challengerId: "22222222-2222-2222-2222-222222222222",
        challengedId: "33333333-3333-3333-3333-333333333333",
        date: new Date("2025-01-01T10:00:00Z"),
        bookedDate: new Date("2025-01-02T10:00:00Z"),
        winnerId: null,
        reason: "Test reason"
    }
];


describe("VevController - getVevsPaginated", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should parse query parameters correctly and return valid paginated response", async () => {
        (mockService.getVevsPaginated as any).mockResolvedValue(exampleVevs);
        (mockService.getTotalNumberOfVevs as any).mockResolvedValue(1);

        const req: any = { query: { page: "0", limit: "10" } };
        const res: any = { json: vi.fn() };

        await controller.getVevsPaginated(req, res);

        const response = res.json.mock.calls[0][0];
        PaginatedVevsResponseSchema.parse(response);

        expect(response.page).toBe(0);
        expect(response.limit).toBe(10);
        expect(response.total).toBe(1);
        expect(response.vevs.length).toBe(1);
        expect(response.vevs[0].id).toBe(exampleVevs[0].id);
    });
});