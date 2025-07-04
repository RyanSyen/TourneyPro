import { Prisma } from "@prisma/client";

export const tournamentRulesSelect = {
  id: true,
  tournamentId: true,
  description: true,
  updatedAt: true,
  updatedBy: {
    select: {
      name: true
    },
  }
} satisfies Prisma.TournamentRulesSelect;
