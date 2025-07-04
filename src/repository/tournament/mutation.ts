import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { handlePrismaError } from "../handle-prisma-error";

export async function createTournament(
  tournamentInput: Prisma.TournamentCreateInput,
  tournamentRulesInput: Prisma.TournamentRulesCreateWithoutTournamentInput,
  matchSettingsInput: Prisma.MatchSettingsCreateWithoutTournamentInput,
  tournamentEventsInput: Prisma.TournamentEventCreateWithoutTournamentInput[],
  user: User
) {
  try {
    return await prisma.$transaction(async (tx) => {
      const tournament = await tx.tournament.create({
        data: {
          ...tournamentInput,
          createdBy: { connect: { id: user.id } },
          updatedBy: { connect: { id: user.id } },
        },
      });

      await tx.tournamentRules.create({
        data: {
          ...tournamentRulesInput,
          tournament: { connect: { id: tournament.id } },
          createdBy: { connect: { id: user.id } },
          updatedBy: { connect: { id: user.id } },
        },
      });

      await tx.matchSettings.create({
        data: {
          ...matchSettingsInput,
          tournament: { connect: { id: tournament.id } },
          createdBy: { connect: { id: user.id } },
          updatedBy: { connect: { id: user.id } },
        },
      });

      // we cannot use createMany here if we want to connect createdBy and updatedBy fields (relation fields)
      for (const event of tournamentEventsInput) {
        await tx.tournamentEvent.create({
          data: {
            ...event,
            tournament: { connect: { id: tournament.id } },
            createdBy: { connect: { id: user.id } },
            updatedBy: { connect: { id: user.id } },
          },
        });
      }

      return tournament;
    });
  } catch (error) {
    console.error(`create tournament error: ${error}`);
    handlePrismaError(error);
  }
}

export async function updateTournament(
  id: number,
  data: Prisma.TournamentUpdateInput,
  user: User
) {
  try {
    return await prisma.tournament.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
        updatedBy: {
          connect: { id: user.id },
        },
      },
    });
  } catch (error) {
    console.error(`update tournament ${id} error: ${error}`);
    handlePrismaError(error);
  }
}

export async function deleteTournament(id: number, userId: string) {
  try {
    return await prisma.tournament.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedById: userId,
        updatedById: userId,
      },
    });
  } catch (error) {
    console.error(`delete tournament ${id} error: ${error}`);
    handlePrismaError(error);
  }
}
