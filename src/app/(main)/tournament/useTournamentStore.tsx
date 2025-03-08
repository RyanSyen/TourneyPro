import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { TournamentFormSchema } from "./tournamentSchema";
import { z } from "zod";

type Tournament = z.infer<typeof TournamentFormSchema>;

interface TournamentStore {
  tournaments: Tournament[];
  fetchTournaments: () => Promise<void>;
  addTournament: (tournament: Omit<Tournament, "id">) => Promise<void>;
  updateTournament: (
    id: string,
    updatedTournament: Partial<Tournament>
  ) => Promise<void>;
  deleteTournament: (id: string) => Promise<void>;
}

const useTournamentStore = create<TournamentStore>((set, get) => ({
  tournaments: [],

  fetchTournaments: async () => {
    const res = await fetch("/api/tournaments");
    const data = await res.json();
    set({ tournaments: data });
  },

  addTournament: async (tournament) => {
    const newTournament = { id: uuidv4(), ...tournament };
    await fetch("/api/tournaments", {
      method: "POST",
      body: JSON.stringify(newTournament),
      headers: { "Content-Type": "application/json" },
    });
    set((state) => ({ tournaments: [...state.tournaments, newTournament] }));
  },

  updateTournament: async (id, updatedTournament) => {
    await fetch(`/api/tournaments/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTournament),
      headers: { "Content-Type": "application/json" },
    });
    set((state) => ({
      tournaments: state.tournaments.map((t) =>
        t.id === id ? { ...t, ...updatedTournament } : t
      ),
    }));
  },

  deleteTournament: async (id) => {
    await fetch(`/api/tournaments/${id}`, { method: "DELETE" });
    set((state) => ({
      tournaments: state.tournaments.filter((t) => t.id !== id),
    }));
  },
}));

export default useTournamentStore;
