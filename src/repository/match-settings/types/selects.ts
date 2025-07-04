import { Prisma } from "@prisma/client";

export const matchSettingsSelect = {
  id: true,
  points: true,
  changeOfEnds: true,
  gracePeriod: true,
  allowSpinServe: true,
  allowDeuce: true,
  tournamentId: true,
  updatedAt: true,
  updatedBy: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.MatchSettingsSelect;
