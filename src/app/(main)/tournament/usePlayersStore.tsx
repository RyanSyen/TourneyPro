import { create } from "zustand";
import { Player } from "@/models/player";
import { v4 as uuidv4 } from "uuid";

interface PlayerStore {
  players: Player[];
  fetchPlayer: (playerId: string) => Promise<Player | undefined>;
  fetchPlayers: () => Promise<void>;
  addPlayer: (player: Omit<Player, "id">) => Promise<string>;
  updatePlayer: (
    playerId: string,
    updatedPlayer: Partial<Player>
  ) => Promise<void>;
  deletePlayer: (playerId: string) => Promise<void>;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  players: [],

  fetchPlayer: async (playerId: string) => {
    const res = await fetch(`/api/players/${playerId}`);
    const data = await res.json();
    // set({ players: [data] });
    await get().fetchPlayers();
    const players = get().players;
    console.log("players: ", players);
    return data;
  },

  fetchPlayers: async () => {
    const res = await fetch("/api/players");
    const data = await res.json();
    set({ players: data });
  },

  addPlayer: async (tournament) => {
    const newPlayer = { id: uuidv4(), ...tournament };
    await fetch("/api/players", {
      method: "POST",
      body: JSON.stringify(newPlayer),
      headers: { "Content-Type": "application/json" },
    });
    set((state) => ({ players: [...state.players, newPlayer] }));
    return newPlayer.id;
  },

  updatePlayer: async (playerId, updatedTournament) => {
    await fetch(`/api/players/${playerId}`, {
      method: "PUT",
      body: JSON.stringify({ playerId, updatedTournament }),
      headers: { "Content-Type": "application/json" },
    });
    set((state) => ({
      players: state.players.map((t) =>
        t.id === playerId ? { ...t, ...updatedTournament } : t
      ),
    }));
  },

  deletePlayer: async (playerId) => {
    await fetch(`/api/players/${playerId}`, { method: "DELETE" });
    set((state) => ({
      players: state.players.filter((t) => t.id !== playerId),
    }));
  },
}));

export default usePlayerStore;
