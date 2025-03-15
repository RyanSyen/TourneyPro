import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { MatchSettings } from "@/models/matchSettings";
import { IMatchSettings } from "@/types/matchSettings";
import dayjs from "dayjs";


interface TournamentStore {
    matchSettings: MatchSettings;
    fetchMatchSettings: (tournamentId: string) => Promise<MatchSettings | undefined>;
    addMatchSettings: (tournamentId: string) => Promise<void>;
    updateMatchSettings: (
      tournamentId: string,
      updatedMatchSettings: MatchSettings
    ) => Promise<void>;
  }
  
  const useMatchSettingsStore = create<TournamentStore>((set, get) => ({
    matchSettings: {
        tournamentId: '0',
        points: '21',
        changeOfEnds: '3',
        gracePeriod: '5',
        allowSpinServe: true,
        allowDeuce: true
    },
  
    fetchMatchSettings: async (tournamentId: string) => {
        console.log('tournamentId: ', tournamentId)
        const res = await fetch(`/api/matchSettings/${tournamentId}`);
        const data = await res.json();
        set({ matchSettings: data });
        return data;
    },
  
    addMatchSettings: async (tournamentId: string) => {
      const res = await fetch("/api/matchSettings", {
        method: "POST",
        body: JSON.stringify(tournamentId),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      set({matchSettings: data});
    },
  
    updateMatchSettings: async (id, updatedTournament) => {
      await fetch(`/api/matchSettings/${id}`, {
        method: "PUT",
        body: JSON.stringify({id, updatedTournament}),
        headers: { "Content-Type": "application/json" },
      });
      set({matchSettings: updatedTournament});
    }
  }));
  
  export default useMatchSettingsStore;