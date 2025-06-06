// import { TournamentEvent } from "@/form_schema/event";
// import { create } from "zustand";
// import { v4 as uuidv4 } from "uuid";

// interface TournamentEventStore {
//   tournamentEvent: TournamentEvent[];
//   fetchTournamentEvents: (
//     tournamentId: string
//   ) => Promise<TournamentEvent[] | undefined>;
//   addTournamentEvent: (
//     tournamentId: string,
//     event: TournamentEvent
//   ) => Promise<string>;
//   updateTournamentEvent: (
//     tournamentId: string,
//     updatedTournamentEvent: TournamentEvent
//   ) => Promise<void>;
//   deleteTournamentEvent: (tournamentId: string, id: string) => Promise<void>;
// }

// /* eslint-disable @typescript-eslint/no-unused-vars */
// const useTournamentEventStore = create<TournamentEventStore>((set, get) => ({
//   tournamentEvent: [],

//   fetchTournamentEvents: async (tournamentId: string) => {
//     const res = await fetch(`/api/tournament-event/${tournamentId}`);
//     const data = await res.json();
//     set({ tournamentEvent: data });
//     return data;
//   },

//   addTournamentEvent: async (tournamentId, event) => {
//     event.id = uuidv4();
//     const res = await fetch("/api/tournament-event", {
//       method: "POST",
//       body: JSON.stringify({ tournamentId, event }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     set({ tournamentEvent: data });
//     return event.id;
//   },

//   updateTournamentEvent: async (tournamentId, updatedEvent) => {
//     await fetch(`/api/tournament-event/${tournamentId}`, {
//       method: "PUT",
//       body: JSON.stringify(updatedEvent),
//       headers: { "Content-Type": "application/json" },
//     });
//     set((state) => ({
//       tournamentEvent: [...state.tournamentEvent, updatedEvent],
//     }));
//   },

//   deleteTournamentEvent: async (tournamentId, id) => {
//     await fetch(`/api/tournament-event/${tournamentId}`, {
//       method: "DELETE",
//       body: JSON.stringify(id),
//       headers: { "Content-Type": "application/json" },
//     });
//   },
// }));

// export default useTournamentEventStore;
