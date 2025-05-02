import { z } from 'zod';


const MAX_LENGTH_FOR_VEV_REASON = 1000

// Request Schemas
export const CreateVevSchema = z.object({
    challengedId: z.string().uuid(),
    date: z.date(), 
    reason: z.string().max(MAX_LENGTH_FOR_VEV_REASON),
});

export const UpdateVevSchema = z.object({
    date: z.date(), 
    winnerId: z.string().uuid().nullable(),
    reason: z.string().max(MAX_LENGTH_FOR_VEV_REASON),
});

export const UpdateVevWinnerSchema = z.object({
    winnerId: z.string().uuid().nullable(),
})


export type CreateVevDTO = z.infer<typeof CreateVevSchema>;

