import { Prisma } from "@prisma/client";

export const tournamentSelect = {
  id: true,
  title: true,
  description: true,
  location: true,
  thumbnail: true,
  isPublic: true,
  type: true,
  tournamentStart: true,
  tournamentEnd: true,
  registrationStart: true,
  registrationEnd: true,
  status: true,
  createdBy: true,
  rules: true,
  matchSettings: true,
} satisfies Prisma.TournamentSelect;
