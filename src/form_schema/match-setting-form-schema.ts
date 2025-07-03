import { z } from "zod";

// Define Match Settings Schema
export const MatchSettingsSchema = z.object({
    points: z.string().min(1, {
      message: "Tournament point system is required.",
    }),
    changeOfEnds: z.string().min(1, {
      message: "Change of ends is required",
    }),
    gracePeriod: z.string().min(1, {
      message: "Grace period is required",
    }),
    allowSpinServe: z.boolean({
      required_error: "Allow spin serve is required.",
    }),
    allowDeuce: z.boolean({
      required_error: "Allow spin serve is required.",
    }),
});

export type MatchSettings = z.infer<typeof MatchSettingsSchema>;
