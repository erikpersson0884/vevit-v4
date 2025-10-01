import { describe, it, expect, vi, beforeEach } from "vitest";
import { VevService } from "../../services/vevService.js";
import mockPrisma, { mockVevs } from "../prismaMock.js";


const vevService = new VevService(mockPrisma as any);

describe("getVevsPaginated", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Take/Skip tests
    it("should return the correct number of items with take", async () => {
        const result = await vevService.getVevsPaginated(0, 2);
        expect(result).toHaveLength(2);
    });

    it("should return the correct number of items with skip", async () => {
        const result = await vevService.getVevsPaginated(2, 4);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe("3");
    });

    // Sorting tests
    it("should sort by date ascending", async () => {
        const result = await vevService.getVevsPaginated(0, 6, { field: "date", direction: "asc" });
        expect(result.map(r => r.id)).toEqual(["3", "1", "2", "4"]);
    });

    it("should sort by challengerId descending", async () => {
        const result = await vevService.getVevsPaginated(0, 6, { field: "challengerId", direction: "desc" });
        expect(result.map(r => r.challengerId)).toEqual(["C", "C", "B", "A"]);
    });

    // Filtering tests
    it("should filter by future timeFilter", async () => {
        const now = new Date("2025-01-15");
        vi.setSystemTime(now); // control system time
        const result = await vevService.getVevsPaginated(0, 5, { field: "date", direction: "asc" }, { timeFilter: "future", userFilter: "all", userId: undefined });
        expect(result.map(r => r.id)).toEqual(["2", "4"]); // only Feb is future
    });

    it("should filter by past timeFilter", async () => {
        const now = new Date("2025-01-15");
        vi.setSystemTime(now);
        const result = await vevService.getVevsPaginated(0, 5, { field: "date", direction: "asc" }, { timeFilter: "past", userFilter: "all", userId: undefined });
        expect(result.map(r => r.id)).toEqual(["3", "1"]);
    });

    it("should filter by user (mine)", async () => {
        const result = await vevService.getVevsPaginated(0, 5, { field: "date", direction: "asc" }, { timeFilter: "all", userFilter: "mine", userId: "A" });
        // challenger or challenged is A
        expect(result.map(r => r.id)).toEqual(["3", "1"]);
    });

    it("should throw an error if userId is undefined with mine filter", async () => {
        await expect(
            vevService.getVevsPaginated(0, 5, { field: "date", direction: "asc" }, { timeFilter: "all", userFilter: "mine", userId: undefined })
        ).rejects.toThrow("userId must be provided when filterUser is 'mine'");
    });
});
