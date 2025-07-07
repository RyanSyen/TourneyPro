// raw HTTP calls, fetch wrappers

import { apiClient } from "@/lib/api-client";
import { ITournament } from "@/app/(main)/tournament/types/tournament.types";
import { CreateOrUpdateTournamentDto } from "../types/tournament.dto";
import { ITournamentRules } from "../components/TournamentRulesAndMatchSettingsWrapper";

export const tournamentService = {
  getTournament(id: number) {
    return apiClient.request<ITournament>(`/tournaments/${id}`);
  },

  getTournaments(params?: string) {
    const searchParams = new URLSearchParams(params as undefined);
    return apiClient.request<ITournament[]>(`/tournaments?${searchParams}`);
  },

  createTournament(data: CreateOrUpdateTournamentDto) {
    return apiClient.request<ITournament>("/tournaments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateTournament(id: number, data: ITournament) {
    return apiClient.request<ITournament>(`/tournaments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteTournament(id: number) {
    return apiClient.request<void>(`/tournaments/${id}`, {
      method: "DELETE",
    });
  },

  getTournamentRulesAndMatchSettings(id: number) {
    // console.info("Fetching tournament rules from DB/API: ", id);

    return apiClient.request<ITournamentRules>(`/tournament-rules/${id}`);
  },

  updateTournamentRulesAndMatchSettings(id: number, data: ITournamentRules) {
    return apiClient.request<ITournamentRules>(`/tournament-rules/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
