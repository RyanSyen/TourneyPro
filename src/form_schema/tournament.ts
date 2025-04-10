import { z } from "zod";

// Define Tournament Schema
export const TournamentSchema = z.object({
  id: z.string().uuid().optional(),
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
    .max(300, {
      message: "Tournament rules must not be longer than 300 characters.",
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
  registrationDate: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  date: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
  }),
  location: z.string({
    required_error: "Tournament location is required.",
  }),
});

export type Tournament = z.infer<typeof TournamentSchema>;
