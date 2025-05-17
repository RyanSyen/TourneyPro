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

export const CreateOrEditTournamentSchema = z.object({
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

  // tournament event
  event: z.string().min(1, {
    message: "Event is required.",
  }),
  ageGroup: z.string().min(1, {
    message: "Age group is required.",
  }),
  eventType: z.string().min(1, {
    message: "Event type is required.",
  }),
  level: z.string().min(1, {
    message: "Category level is required",
  }),
  prize: z.string().optional(),
  registrationFee: z.number().optional(),

  // tournament match setting
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
