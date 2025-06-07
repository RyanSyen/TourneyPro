import { prisma } from "@/lib/prisma";
import { mapTournamentToDetails } from "@/helper/mapper";
import { IStepOneData } from "@/app/(main)/tournament/shared/components/tournament-details-form";
import { IStepTwoData } from "@/app/(main)/tournament/create/tournament-rules";
import { IStepThreeData } from "@/app/(main)/tournament/create/tournament-events";
// import { auth } from "@clerk/nextjs/server";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { auth } from "../../auth";
import { headers } from "next/headers";
import { ITournamentDetails } from "@/types/tournament";

export async function getAllTournaments() {
  const tournaments = await prisma.tournament.findMany({
    where: { isDeleted: false },
    include: { rules: true, events: true },
    orderBy: { createdAt: "desc" },
  });

  return tournaments.map(mapTournamentToDetails);
}

export async function getTournamentById(tournamentId: number) {
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { rules: true, events: true },
  });

  return tournament ? mapTournamentToDetails(tournament) : null;
}
export async function createTournament(data: {
  step1: IStepOneData;
  step2: IStepTwoData;
  step3: IStepThreeData;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session === null) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    const {
      title,
      description,
      location,
      thumbnail,
      isPublic,
      type,
      date,
      registrationDate,
    } = data.step1;

    const tournament = await prisma.$transaction(
      async (tx) => {
        console.time("createTournament");
        const createdTournament = await tx.tournament.create({
          data: {
            title,
            description,
            location,
            thumbnail,
            isPublic,
            type,
            tournamentStart: date.from,
            tournamentEnd: date.to,
            registrationStart: registrationDate.from,
            registrationEnd: registrationDate.to,
            status: tournamentStatusLookup[0].id,
            createdById: userId,
            updatedById: userId,
          },
        });
        console.timeEnd("createTournament");

        console.time("createRules");
        await tx.tournamentRules.create({
          data: {
            description: data.step2.rules,
            tournamentId: createdTournament.id,
            createdById: userId,
            updatedById: userId,
          },
        });
        console.timeEnd("createRules");

        console.time("matchSettings");
        await tx.matchSettings.create({
          data: {
            ...data.step2.matchSettings,
            tournamentId: createdTournament.id,
            createdById: userId,
            updatedById: userId,
          },
        });
        console.timeEnd("matchSettings");

        console.time("tournamentEvent");
        await tx.tournamentEvent.createMany({
          data: data.step3.events.map(({ ...event }) => ({
            ...event,
            tournamentId: createdTournament.id,
            createdById: userId,
            updatedById: userId,
          })),
        });
        console.timeEnd("tournamentEvent");

        return createdTournament;
      },
      {
        timeout: 10000,
      }
    );

    console.log("Tournament created successfully:", tournament);

    return tournament;
  } catch (error) {
    console.error("Error creating tournament:", error);
    throw new Error(
      `Failed to create tournament: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function updateTournamentDetails(
  tournamentId: number,
  data: ITournamentDetails
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session === null) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const tournament = await prisma.$transaction(async (tx) => {
      const updatedTournament = await tx.tournament.update({
        where: { id: Number(tournamentId) },
        data: {
          id: Number(tournamentId),
          title: data.title,
          description: data.description,
          location: data.location,
          thumbnail: data.thumbnail,
          isPublic: data.isPublic,
          type: data.type,
          tournamentStart: data.date.from,
          tournamentEnd: data.date.to,
          registrationStart: data.registrationDate.from,
          registrationEnd: data.registrationDate.to,
          updatedById: userId,
        },
      });

      return updatedTournament;
    });

    return tournament;
  } catch (error) {
    console.error("Error updating tournament details:", error);
    throw new Error(
      `Failed to update tournament details: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// export async function updateTournament(
//   tournamentId: number,
//   data: {
//     step1: IStepOneData;
//     step2: IStepTwoData;
//     step3: IStepThreeData;
//   }
// ) {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (session === null) {
//       throw new Error("User not authenticated");
//     }

//     const userId = session.user.id;

//     if (!userId) {
//       throw new Error("User not found");
//     }

//     const {
//       title,
//       description,
//       location,
//       thumbnail,
//       isPublic,
//       type,
//       date,
//       registrationDate,
//     } = data.step1;

//     const tournament = await prisma.$transaction(async (tx) => {
//       const updatedTournament = await tx.tournament.update({
//         where: { id: tournamentId },
//         data: {
//           title,
//           description,
//           location,
//           thumbnail,
//           isPublic,
//           type,
//           tournamentStart: date.from,
//           tournamentEnd: date.to,
//           registrationStart: registrationDate.from,
//           registrationEnd: registrationDate.to,
//           updatedById: userId,
//         },
//       });

//       return updatedTournament;
//     });

//     return tournament;
//   } catch (error) {
//     console.error("Error updating tournament:", error);
//     throw new Error(
//       `Failed to update tournament: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }
export async function deleteTournament(tournamentId: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session === null) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const tournament = await prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        isDeleted: true,
        updatedById: userId,
        deletedAt: new Date(),
        deletedById: userId,
      },
    });

    return tournament;
  } catch (error) {
    console.error("Error deleting tournament:", error);
    throw new Error(
      `Failed to delete tournament: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
export async function getTournamentEvents(tournamentId: number) {
  try {
    const events = await prisma.tournamentEvent.findMany({
      where: { tournamentId },
    });

    return events;
  } catch (error) {
    console.error("Error fetching tournament events:", error);
    throw new Error(
      `Failed to fetch tournament events: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
export async function getTournamentRules(tournamentId: number) {
  try {
    const rules = await prisma.tournamentRules.findFirst({
      where: { tournamentId },
    });

    return rules;
  } catch (error) {
    console.error("Error fetching tournament rules:", error);
    throw new Error(
      `Failed to fetch tournament rules: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
export async function getMatchSettings(tournamentId: number) {
  try {
    const matchSettings = await prisma.matchSettings.findFirst({
      where: { tournamentId },
    });

    return matchSettings;
  } catch (error) {
    console.error("Error fetching match settings:", error);
    throw new Error(
      `Failed to fetch match settings: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
