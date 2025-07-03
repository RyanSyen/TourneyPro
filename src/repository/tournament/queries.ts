import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { tournamentSelect } from "./types/selects";

type TournamentPreview = Prisma.TournamentGetPayload<{
  select: typeof tournamentSelect;
}>;

export async function getAllTournaments(
  where?: Prisma.TournamentWhereInput,
  orderBy?: Prisma.TournamentOrderByWithRelationInput[],
  skip?: number,
  take?: number
): Promise<TournamentPreview[]> {
  try {
    return await prisma.tournament.findMany({
      where,
      orderBy,
      skip,
      take: take ? Math.min(take, 100) : 20, // enforce max 100
      select: tournamentSelect,
    });
  } catch (error) {
    console.error("getAllTournaments error:", error);
    throw new Error("Failed to fetch tournaments");
  }
}

export async function getTournamentById(
  id: number
): Promise<TournamentPreview | null> {
  try {
    return await prisma.tournament.findUnique({
      where: { id },
      select: tournamentSelect
    });
  } catch (error) {
    console.error(`getTournamentById ${id} error: ${error}`);
    throw new Error("Failed to fetch tournament");
  }
}
