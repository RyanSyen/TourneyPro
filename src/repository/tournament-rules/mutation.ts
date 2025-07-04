import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { handlePrismaError } from "../handle-prisma-error";

export async function updateTournamentRules(
  id: number,
  data: Prisma.TournamentRulesUpdateInput,
  user: User
) {
  try {
    return await prisma.tournamentRules.update({
      where: { tournamentId: id },
      data: {
        ...data,
        // updatedAt: new Date(),
        // updatedBy: {
        //   connect: { id: user.id },
        // },
      },
    });
  } catch (error) {
    console.error(`updateTournamentRules ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
