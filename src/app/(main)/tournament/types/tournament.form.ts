// Use Zod for DTOs where validation is needed and infer types in form specific types
// Zod Schema: TournamentFormSchema
// Form Input: TournamentFormValues

import { z } from "zod";

// Define Tournament Schema
export const TournamentFormSchema = z.object({
  id: z.number().optional(),
  title: z.string({
    required_error: "Tournament title is required.",
  }),
  description: z.string({
    required_error: "Tournament description is required.",
  }),
  rules: z
    .string()
    .min(10, {
      message: "Tournament rules must be at least 10 characters.",
    })
    .max(1000, {
      message: "Tournament rules must not be longer than 1000 characters.",
    })
    .optional(),
  thumbnail: z.string({
    required_error: "Tournament thumbnail is required.",
  }),
  isPublic: z.boolean({
    required_error: "Tournament visibility is required.",
  }),
  type: z
    .array(z.enum(["circuit", "standalone"]))
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one tournament type.",
    }),
  registrationStartDate: z.string().datetime(),
  registrationEndDate: z.string().datetime(),
  tournamentStartDate: z.string().datetime(),
  tournamentEndDate: z.string().datetime(),
  location: z.string({
    required_error: "Tournament location is required.",
  }),
});

export type TournamentFormValues = z.infer<typeof TournamentFormSchema>;
