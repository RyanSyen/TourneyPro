import { TournamentEvent } from "@/models/event";
import { create } from "zustand";

interface TournamentEventStore {
  tournamentEvent: TournamentEvent[];
  fetchTournamentEvent: (
    tournamentId: string
  ) => Promise<TournamentEvent[] | undefined>;
  addTournamentEvent: (tournamentId: string) => Promise<void>;
  updateTournamentEvent: (
    tournamentId: string,
    updatedTournamentEvent: TournamentEvent
  ) => Promise<void>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const useTournamentEventStore = create<TournamentEventStore>((set, get) => ({
  tournamentEvent: [],

  fetchTournamentEvent: async (tournamentId: string) => {
    console.log("tournamentId: ", tournamentId);
    const res = await fetch(`/api/tournament-event/${tournamentId}`);
    const data = await res.json();
    set({ tournamentEvent: data });
    return data;
  },

  addTournamentEvent: async (tournamentId: string) => {
    // await get().fetchMatchSettings(tournamentId);
    // const matchsettings = get().matchSettings;
    // console.log("tournaments: ", matchsettings);
    const res = await fetch("/api/tournament-event", {
      method: "POST",
      body: JSON.stringify(tournamentId),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    set({ tournamentEvent: data });
  },

  updateTournamentEvent: async (tournamentId, updatedMatchSettings) => {
    await fetch(`/api/matchSettings/${tournamentId}`, {
      method: "PUT",
      body: JSON.stringify({ tournamentId, updatedMatchSettings }),
      headers: { "Content-Type": "application/json" },
    });
    set((state) => ({
      tournamentEvent: [...state.tournamentEvent, updatedMatchSettings],
    }));
  },
}));

export default useTournamentEventStore;
