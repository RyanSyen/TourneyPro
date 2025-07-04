import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { matchSettingsSelect } from "./types/selects";
import { handlePrismaError } from "../handle-prisma-error";

type MatchSettingsPreview = Prisma.MatchSettingsGetPayload<{
  select: typeof matchSettingsSelect;
}>;

export async function getMatchSettingsByTournamentId(
  id: number
): Promise<MatchSettingsPreview | null> {
  try {
    return await prisma.matchSettings.findUnique({
      where: { tournamentId: id },
      select: matchSettingsSelect,
    });
  } catch (error) {
    console.error(`getMatchSettingsByTournamentId ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
