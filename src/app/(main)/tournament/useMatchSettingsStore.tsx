import { MatchSettings } from "@/models/matchSetting";
import { create } from "zustand";

interface TournamentStore {
  matchSettings: MatchSettings;
  fetchMatchSettings: (
    tournamentId: string
  ) => Promise<MatchSettings | undefined>;
  addMatchSettings: (tournamentId: string) => Promise<void>;
  updateMatchSettings: (
    tournamentId: string,
    updatedMatchSettings: MatchSettings
  ) => Promise<void>;
}

const useMatchSettingsStore = create<TournamentStore>((set, get) => ({
  matchSettings: {
    tournamentId: "0",
    points: "21",
    changeOfEnds: "3",
    gracePeriod: "5",
    allowSpinServe: true,
    allowDeuce: true,
  },

  fetchMatchSettings: async (tournamentId: string) => {
    console.log("tournamentId: ", tournamentId);
    const res = await fetch(`/api/matchSettings/${tournamentId}`);
    const data = await res.json();
    set({ matchSettings: data });
    return data;
  },

  addMatchSettings: async (tournamentId: string) => {
    await get().fetchMatchSettings(tournamentId);
    const matchsettings = get().matchSettings;
    console.log("tournaments: ", matchsettings);
    const res = await fetch("/api/matchSettings", {
      method: "POST",
      body: JSON.stringify(tournamentId),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    set({ matchSettings: data });
  },

  updateMatchSettings: async (id, updatedTournament) => {
    await fetch(`/api/matchSettings/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, updatedTournament }),
      headers: { "Content-Type": "application/json" },
    });
    set({ matchSettings: updatedTournament });
  },
}));

export default useMatchSettingsStore;
