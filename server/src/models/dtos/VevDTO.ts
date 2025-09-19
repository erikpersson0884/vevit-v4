import { z } from 'zod';


const MAX_LENGTH_FOR_VEV_REASON = 1000

// Request Schemas
export const GetVevsPaginatedSchema = z.object({
    page: z.string().regex(/^\d+$/).transform((val) => parseInt(val, 10)).default("0"),
    limit: z.string().regex(/^\d+$/).transform((val) => parseInt(val, 10)).default("25"),
});

export const CreateVevSchema = z.object({
    challengedId: z.string().uuid(),
    date: z.string(), 
    reason: z.string().max(MAX_LENGTH_FOR_VEV_REASON),
});

export const UpdateVevSchema = z.object({
    date: z.date().optional(), 
    winnerId: z.string().uuid().nullable().optional(),
    reason: z.string().max(MAX_LENGTH_FOR_VEV_REASON).optional(),
});

export const UpdateVevWinnerSchema = z.object({
    winnerId: z.string().uuid().nullable(),
})


// Response Schemas
export const VevResponseSchema = z.object({
    id: z.string().uuid(),
    challengerId: z.string().uuid(),
    challengedId: z.string().uuid(),
    date: z.date(),
    bookedDate: z.date(),
    winnerId: z.string().uuid().nullable(),
    reason: z.string().max(MAX_LENGTH_FOR_VEV_REASON),
});

export const PaginatedVevsResponseSchema = z.object({
    vevs: z.array(VevResponseSchema),
    page: z.number(),
    limit: z.number(),
    total: z.number(),
});




