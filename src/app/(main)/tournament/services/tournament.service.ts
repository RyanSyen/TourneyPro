import { mapTournamentToDetails } from "@/helper/mapper";
import { tournamentStatusLookup } from "@/lookups/tournament/statusLookup";
import {
  ITournament,
  ITournamentEvent,
  ITournamentRule,
} from "@/app/(main)/tournament/types/tournament.types";
import { Prisma } from "@prisma/client";
import {
  getAllTournaments,
  getTournamentById,
} from "@/repository/tournament/queries";
import {
  createTournament,
  updateTournament,
} from "@/repository/tournament/mutation";
import { updateTournamentRules } from "@/repository/tournament-rules/mutation";
import { updateMatchSettings } from "@/repository/match-settings/mutation";
import { requireAuthUser } from "@/services/require-auth-user";
import { getMatchSettingsByTournamentId } from "@/repository/match-settings/queries";
import { getTournamentRulesByTournamentId } from "@/repository/tournament-rules/queries";
import { ITournamentRules } from "../components/TournamentRulesAndMatchSettingsWrapper";

/* #region tournament methods */
export async function fetchAllTournaments(): Promise<ITournament[]> {
  const tournaments = await getAllTournaments(
    { isDeleted: false },
    [{ createdAt: "desc" }],
    0,
    10
  );
  return tournaments.map(mapTournamentToDetails);
}

export async function fetchTournamentById(id: number): Promise<ITournament> {
  const user = await requireAuthUser();

  const tournament = await getTournamentById(id);
  if (!tournament) throw new Error("Tournament not found");

  const isOwner = tournament.createdBy?.id === user.id;
  if (!isOwner)
    throw new Error("You are not authorized to view this tournament");

  return mapTournamentToDetails(tournament);
}

export async function setupDraftTournament(data: {
  step1: ITournament;
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
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function setTournamentDetails(
  tournamentId: number,
  data: ITournament
) {
  try {
    const user = await requireAuthUser();

    const updateTournamentInput: Prisma.TournamentUpdateInput = {
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
      status: tournamentStatusLookup[0].id,
    };

    return await updateTournament(tournamentId, updateTournamentInput, user);
  } catch (error) {
    // console.error("Error setting tournament:", error);
    throw new Error(
      "Error updating tournament. Please try again or contact support."
    );
  }
}
/* #endregion tournament methods */

/* #region tournament rules methods */
export async function fetchTournamentRulesAndMatchSettings(id: number) {
  const user = await requireAuthUser();

  const tournament = await getTournamentById(id);
  if (!tournament) throw new Error("Tournament not found");

  const isOwner = tournament.createdBy?.id === user.id;
  if (!isOwner)
    throw new Error("You are not authorized to view this tournament");

  const matchSettings = await getMatchSettingsByTournamentId(id);
  if (!matchSettings)
    throw new Error(`Match Settings with tournament id ${id} not found`);

  const rules = await getTournamentRulesByTournamentId(id);
  if (!rules)
    throw new Error(`Tournament rules with tournament id ${id} not found`);

  const rulesPayload: ITournamentRule = {
    ...rules,
    updatedBy: rules.updatedBy?.name,
  };

  const payload: ITournamentRules = {
    matchSettings: matchSettings,
    rules: rulesPayload,
  };

  return payload;
}

export async function setTournamentRulesAndMatchSettings(
  tournamentId: number,
  data: ITournamentRules
) {
  try {
    const user = await requireAuthUser();

    const updateTournamentRulesInput: Prisma.TournamentRulesUpdateWithoutTournamentInput =
      {
        description: data.rules.description,
      };

    const res1 = await updateTournamentRules(
      tournamentId,
      updateTournamentRulesInput,
      user
    );

    const updateMatchSettingsInput: Prisma.MatchSettingsUpdateWithoutTournamentInput =
      {
        points: data.matchSettings.points,
        changeOfEnds: data.matchSettings.changeOfEnds,
        gracePeriod: data.matchSettings.gracePeriod,
        allowSpinServe: data.matchSettings.allowSpinServe,
        allowDeuce: data.matchSettings.allowDeuce,
      };

    const res2 = await updateMatchSettings(
      tournamentId,
      updateMatchSettingsInput,
      user
    );

    const rulesPayload: ITournamentRule = {
      description: res1.description,
    };

    const payload: ITournamentRules = {
      rules: rulesPayload,
      matchSettings: res2,
    };

    return payload;
  } catch (error) {
    console.error("Error setting tournament rules and match settings:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
/* #endregion tournament rules methods */
