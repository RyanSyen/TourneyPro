import { z } from "zod";

export const TournamentRulesSchema = z.object({
  rules: z
    .string()
    .min(10, {
      message: "Tournament rules must be at least 10 characters.",
    })
    .max(1000, {
      message: "Tournament rules must not be longer than 1000 characters.",
    })
});

export type TournamentRules = z.infer<typeof TournamentRulesSchema>;