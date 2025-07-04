import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { tournamentRulesSelect } from "./types/selects";
import { handlePrismaError } from "../handle-prisma-error";

type TournamentRulesPreview = Prisma.TournamentRulesGetPayload<{
  select: typeof tournamentRulesSelect;
}>;

export async function getTournamentRulesByTournamentId(
  id: number
): Promise<TournamentRulesPreview | null> {
  try {
    return await prisma.tournamentRules.findUnique({
      where: { tournamentId: id },
      select: tournamentRulesSelect,
    });
  } catch (error) {
    console.error(`getTournamentRulesByTournamentId ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
