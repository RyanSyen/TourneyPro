import { z } from "zod";

// Define Event Schema
export const TournamentEventSchema = z.object({
    id: z.string(),
    event: z.string().min(1, {
      message: "Event is required.",
    }),
    ageGroup: z.string().min(1, {
      message: "Age group is required.",
    }),
    type: z.string().min(1, {
      message: "Event type is required.",
    }),
    level: z.string().min(1, {
      message: "Category level is required",
    }),
    prize: z.string().optional(),
    registrationFee: z.number().optional(),
  });

export type TournamentEvent = z.infer<typeof TournamentEventSchema>;
