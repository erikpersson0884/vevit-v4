import { z } from "zod";


export const AchievementSchema = z.object({
    id: z.string(),
    userId: z.string(),
    achievementId: z.string(),
    achievedAt: z.date()
});

export type AchievementDTO = z.infer<typeof AchievementSchema>;
