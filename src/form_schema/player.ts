import { z } from "zod";

// Define Player Schema
export const PlayerSchema = z.object({
  id: z.string().uuid().optional(),
    tournamentId: z.string(),
    name: z.string().min(1, {
      message: "Player name is required.",
    }),
    organization: z.string().min(1, {
      message: "Player organization is required",
    }),
});

export type Player = z.infer<typeof PlayerSchema>;
