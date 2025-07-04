import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { handlePrismaError } from "../handle-prisma-error";

export async function updateMatchSettings(
  id: number,
  data: Prisma.MatchSettingsUpdateInput,
  user: User
) {
  try {
    return await prisma.matchSettings.update({
      where: { tournamentId: id },
      data: {
        ...data,
        updatedAt: new Date(),
        updatedBy: {
          connect: { id: user.id },
        },
      },
    });
  } catch (error) {
    console.error(`updateMatchSettings ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
