import { vi } from "vitest";
import { Vev } from "@prisma/client";

export const mockVevs: Vev[] = [
    { id: "1", date: new Date("2025-01-01"), challengerId: "A", challengedId: "B", bookedDate: new Date("2025-01-01"), reason: "", winnerId: null },
    { id: "2", date: new Date("2025-02-01"), challengerId: "B", challengedId: "B", bookedDate: new Date("2025-02-01"), reason: "", winnerId: null },
    { id: "3", date: new Date("2024-12-01"), challengerId: "C", challengedId: "A", bookedDate: new Date("2024-12-01"), reason: "", winnerId: null },
    { id: "4", date: new Date("2026-12-01"), challengerId: "C", challengedId: "B", bookedDate: new Date("2024-12-01"), reason: "", winnerId: null },
];

const mockPrisma = {
  vev: {
    findMany: vi.fn().mockImplementation(({ skip = 0, take = mockVevs.length, orderBy, where }) => {
      let result = [...mockVevs];

      // --- time filter ---
      if (where?.AND) {
        for (const condition of where.AND) {
          if (condition.date?.gte) {
            result = result.filter(v => v.date >= condition.date.gte);
          }
          if (condition.date?.gt) {
            result = result.filter(v => v.date > condition.date.gt);
          }
          if (condition.date?.lt) {
            result = result.filter(v => v.date < condition.date.lt);
          }
          if (condition.OR) {
            result = result.filter(v =>
              condition.OR.some((c: any) =>
                c.challengerId ? v.challengerId === c.challengerId : v.challengedId === c.challengedId
              )
            );
          }
        }
      }

      // --- sorting ---
      if (orderBy) {
        const [field, direction] = Object.entries(orderBy)[0] as [keyof Vev, "asc" | "desc"];
        result.sort((a, b) => {
          if (a[field]! < b[field]!) return direction === "asc" ? -1 : 1;
          if (a[field]! > b[field]!) return direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      // --- pagination ---
      result = result.slice(skip, skip + take);

      return Promise.resolve(result);
    }),
  },
} as any;

export default mockPrisma;