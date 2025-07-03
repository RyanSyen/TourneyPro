// import { prisma } from "@/lib/prisma";
import { mapTournamentToDetails } from "@/helper/mapper";
import { ITournamentRules } from "@/app/(main)/tournament/create/tournament-rules";
import { IStepThreeData } from "@/app/(main)/tournament/create/tournament-events";
// import { auth } from "@clerk/nextjs/server";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import { auth } from "../../auth";
import { headers } from "next/headers";
import { ITournamentDetails } from "@/types/tournament";
import { ITournamentEvent } from "@/types/event";
import { Prisma } from "@prisma/client";
import {
  getAllTournaments,
  getTournamentById,
} from "@/repository/tournament/queries";
import { requireAuthUser } from "./requireAuthUser";
import { createTournament } from "@/repository/tournament/mutation";
import { create } from "domain";
import { prisma } from "@/lib/prisma";

// export async function getAllTournaments() {
//   const tournaments = await prisma.tournament.findMany({
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       location: true,
//       thumbnail: false,
//       isPublic: true,
//       type: true,
//       registrationStart: true,
//       registrationEnd: true,
//       tournamentStart: true,
//       tournamentEnd: true,
//       status: true,
//       createdAt: true,
//       updatedAt: true,
//       createdById: true,
//       updatedById: true,
//     },
//     where: { isDeleted: false },
//     // include: { rules: true, events: true },
//     orderBy: { createdAt: "desc" },
//     // take: 5,
//   });

//   return tournaments.map(mapTournamentToDetails);
// }

// export async function getTournamentById(tournamentId: number) {
//   const tournament = await prisma.tournament.findUnique({
//     where: { id: tournamentId },
//     include: { rules: true, events: true, matchSettings: true },
//   });

//   console.log("Fetched Tournament:", tournament);

//   return tournament ? mapTournamentToDetails(tournament) : null;
// }
// export async function createTournament(data: {
//   step1: ITournamentDetails;
//   step2: ITournamentRules;
//   step3: ITournamentEvent[];
// }) {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (session === null) {
//       throw new Error("User not authenticated");
//     }

//     const userId = session.user.id;

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const createTournamentInput: Prisma.TournamentCreateInput = {
//       title: data.step1.title,
//       description: data.step1.description,
//       location: data.step1.location,
//       thumbnail: data.step1.thumbnail,
//       isPublic: data.step1.isPublic,
//       type: data.step1.type,
//       tournamentStart: data.step1.tournamentStartDate,
//       tournamentEnd: data.step1.tournamentEndDate,
//       registrationStart: data.step1.registrationStartDate,
//       registrationEnd: data.step1.registrationEndDate,
//       status: tournamentStatusLookup[0].id,
//       createdBy: user ? { connect: { id: user.id } } : undefined,
//       updatedBy: user ? { connect: { id: user.id } } : undefined,
//     };

//     const tournament = await prisma.$transaction(
//       async (tx) => {
//         console.time("createTournament");
//         const createdTournament = await tx.tournament.create({
//           data: createTournamentInput,
//         });
//         console.timeEnd("createTournament");

//         console.time("createRules");
//         const createTournamentRulesInput: Prisma.TournamentRulesCreateInput = {
//           description: data.step2.rules.description,
//           tournament: {
//             connect: { id: createdTournament.id }, // This will be set after creating the tournament
//           },
//           createdBy: user ? { connect: { id: user.id } } : undefined,
//           updatedBy: user ? { connect: { id: user.id } } : undefined,
//         };
//         await tx.tournamentRules.create({
//           data: createTournamentRulesInput,
//         });
//         console.timeEnd("createRules");

//         console.time("matchSettings");
//         const createTournamentMatchSettingsInput: Prisma.MatchSettingsCreateInput =
//           {
//             ...data.step2.matchSettings,
//             tournament: {
//               connect: { id: createdTournament.id }, // This will be set after creating the tournament
//             },
//             createdBy: user ? { connect: { id: user.id } } : undefined,
//             updatedBy: user ? { connect: { id: user.id } } : undefined,
//           };
//         await tx.matchSettings.create({
//           data: createTournamentMatchSettingsInput,
//         });
//         console.timeEnd("matchSettings");

//         console.time("tournamentEvent");
//         const createTournamentEventInput = data.step3.map(({ ...event }) => {
//           return {
//             ...event,
//             tournament: {
//               connect: { id: createdTournament.id }, // This will be set after creating the tournament
//             },
//             createdBy: user ? { connect: { id: user.id } } : undefined,
//             updatedBy: user ? { connect: { id: user.id } } : undefined,
//           } as Prisma.TournamentEventCreateManyInput;
//         });
//         await tx.tournamentEvent.createMany({
//           data: createTournamentEventInput,
//         });
//         console.timeEnd("tournamentEvent");

//         return createdTournament;
//       },
//       {
//         timeout: 10000,
//       }
//     );

//     console.log("Tournament created successfully:", tournament);

//     return tournament;
//   } catch (error) {
//     console.error("Error creating tournament:", error);
//     throw new Error(
//       `Failed to create tournament: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }

// export async function updateTournamentDetails(
//   tournamentId: number,
//   data: ITournamentDetails
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

//     const tournament = await prisma.$transaction(async (tx) => {
//       const updatedTournament = await tx.tournament.update({
//         where: { id: Number(tournamentId) },
//         data: {
//           id: Number(tournamentId),
//           title: data.title,
//           description: data.description,
//           location: data.location,
//           thumbnail: data.thumbnail,
//           isPublic: data.isPublic,
//           type: data.type,
//           tournamentStart: data.tournamentStartDate,
//           tournamentEnd: data.tournamentEndDate,
//           registrationStart: data.registrationStartDate,
//           registrationEnd: data.registrationEndDate,
//           updatedById: userId,
//         },
//       });

//       return updatedTournament;
//     });

//     return tournament;
//   } catch (error) {
//     console.error("Error updating tournament details:", error);
//     throw new Error(
//       `Failed to update tournament details: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }

// export async function deleteTournament(tournamentId: number) {
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

//     const tournament = await prisma.tournament.update({
//       where: { id: tournamentId },
//       data: {
//         isDeleted: true,
//         updatedById: userId,
//         deletedAt: new Date(),
//         deletedById: userId,
//       },
//     });

//     return tournament;
//   } catch (error) {
//     console.error("Error deleting tournament:", error);
//     throw new Error(
//       `Failed to delete tournament: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }
// export async function getTournamentEvents(tournamentId: number) {
//   try {
//     const events = await prisma.tournamentEvent.findMany({
//       where: { tournamentId },
//     });

//     return events;
//   } catch (error) {
//     console.error("Error fetching tournament events:", error);
//     throw new Error(
//       `Failed to fetch tournament events: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }
// export async function getTournamentRules(tournamentId: number) {
//   try {
//     const rules = await prisma.tournamentRules.findFirst({
//       where: { tournamentId },
//     });

//     return rules;
//   } catch (error) {
//     console.error("Error fetching tournament rules:", error);
//     throw new Error(
//       `Failed to fetch tournament rules: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }
// export async function getMatchSettings(tournamentId: number) {
//   try {
//     const matchSettings = await prisma.matchSettings.findFirst({
//       where: { tournamentId },
//     });

//     return matchSettings;
//   } catch (error) {
//     console.error("Error fetching match settings:", error);
//     throw new Error(
//       `Failed to fetch match settings: ${
//         error instanceof Error ? error.message : String(error)
//       }`
//     );
//   }
// }

// export async function updateTournamentRulesAndMatchSettings() {}

//   const user = await requireAuthUser();

export async function fetchAllTournaments(): Promise<ITournamentDetails[]> {
  const tournaments = await getAllTournaments(
    { isDeleted: false },
    [{ createdAt: "desc" }],
    0,
    10
  );
  return tournaments.map(mapTournamentToDetails);
}

export async function fetchTournamentById(
  id: number
): Promise<ITournamentDetails> {
  const user = await requireAuthUser();

  console.log("user: ", user);

  const tournament = await getTournamentById(id);
  if (!tournament) throw new Error("Tournament not found");

  const isOwner = tournament.createdBy?.id === user.id;
  if (!isOwner)
    throw new Error("You are not authorized to view this tournament");

  return mapTournamentToDetails(tournament);
}

export async function setupDraftTournament(data: {
  step1: ITournamentDetails;
  step2: ITournamentRules;
  step3: ITournamentEvent[];
}) {
  try {
    const user = await requireAuthUser();

    const createTournamentInput: Prisma.TournamentCreateInput = {
      title: data.step1.title,
      description: data.step1.description,
      location: data.step1.location,
      thumbnail: data.step1.thumbnail,
      isPublic: data.step1.isPublic,
      type: data.step1.type,
      tournamentStart: data.step1.tournamentStartDate,
      tournamentEnd: data.step1.tournamentEndDate,
      registrationStart: data.step1.registrationStartDate,
      registrationEnd: data.step1.registrationEndDate,
      status: tournamentStatusLookup[0].id,
    };

    const createTournamentRulesInput: Prisma.TournamentRulesCreateWithoutTournamentInput =
      {
        description: data.step2.rules.description,
      };

    const createTournamentMatchSettingsInput: Prisma.MatchSettingsCreateWithoutTournamentInput =
      {
        ...data.step2.matchSettings,
      };

    const createTournamentEventInput: Prisma.TournamentEventCreateWithoutTournamentInput[] =
      data.step3.map(({ ...event }) => {
        return {
          ...event,
        } as Prisma.TournamentEventCreateManyInput;
      });

    return await createTournament(
      createTournamentInput,
      createTournamentRulesInput,
      createTournamentMatchSettingsInput,
      createTournamentEventInput,
      user
    );
  } catch (error) {
    console.error("Error setting up draft tournament:", error);
    // throw new Error(
    //   `Failed to setup draft tournament: ${
    //     error instanceof Error ? error.message : String(error)
    //   }`
    // );
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function setTournamentDetails(
  tournamentId: number,
  data: ITournamentDetails
) {
  const user = await requireAuthUser();

  const updatedTournament = await prisma.tournament.update({
    where: { id: tournamentId },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      thumbnail: data.thumbnail,
      isPublic: data.isPublic,
      type: data.type,
      tournamentStart: data.tournamentStartDate,
      tournamentEnd: data.tournamentEndDate,
      registrationStart: data.registrationStartDate,
      registrationEnd: data.registrationEndDate,
      updatedById: user.id,
    },
  });

  return updatedTournament;
}

export async function setTournamentRulesAndMatchSettings(
  tournamentId: number,
  data: ITournamentRules
) {
  try {
    const user = await requireAuthUser();

    const updatedTournamentRules = await prisma.tournamentRules.update({
      where: { tournamentId },
      data: {
        description: data.rules.description,
        updatedById: user.id,
      },
    });

    const updatedMatchSettings = await prisma.matchSettings.update({
      where: { tournamentId },
      data: {
        ...data.matchSettings,
        updatedById: user.id,
      },
    });

    return { updatedTournamentRules, updatedMatchSettings };
  } catch (error) {
    console.error("Error setting tournament rules and match settings:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
