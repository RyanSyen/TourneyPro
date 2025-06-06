// import { create } from "zustand";
// import { v4 as uuidv4 } from "uuid";
// import { z } from "zod";
// import { TournamentSchema } from "@/form_schema/tournament";
// import { ITournamentDetails } from "@/types/tournament";

// type Tournament = z.infer<typeof TournamentSchema>;

// interface TournamentStore {
//   tournaments: ITournamentDetails[];
//   fetchTournament: (id: number) => Promise<ITournamentDetails | undefined>;
//   fetchTournaments: () => Promise<void>;
//   addTournament: (tournament: Omit<Tournament, "id">) => Promise<number>;
//   updateTournament: (
//     id: number,
//     updatedTournament: Tournament
//   ) => Promise<void>;
//   deleteTournament: (id: number) => Promise<void>;
//   publishTournament: (id: number) => Promise<void>;
// }

// const useTournamentStore = create<TournamentStore>((set, get) => ({
//   tournaments: [],

//   fetchTournament: async (id: number) => {
//     await get().fetchTournaments();
//     const tournaments = get().tournaments;
//     console.log("tournaments: ", tournaments);
//     return tournaments.find((t) => t.id === id);
//   },

//   fetchTournaments: async () => {
//     const res = await fetch("/api/tournaments");
//     const data = await res.json();
//     set({ tournaments: data });
//   },

//   addTournament: async (tournament) => {
//     const newTournament = { ...tournament };
//     await fetch("/api/tournaments", {
//       method: "POST",
//       body: JSON.stringify(newTournament),
//       headers: { "Content-Type": "application/json" },
//     });
//     // set((state) => ({ tournaments: [...state.tournaments, newTournament] }));
//     return newTournament.id;
//   },

//   updateTournament: async (id, updatedTournament) => {
//     await fetch(`/api/tournaments/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ id, updatedTournament }),
//       headers: { "Content-Type": "application/json" },
//     });
//     set((state) => ({
//       tournaments: state.tournaments.map((t) =>
//         t.id === id
//           ? {
//               ...t,
//               ...updatedTournament,
//               // registrationDate: {
//               //   from: new Date(updatedTournament.registrationDate.from),
//               //   to: new Date(updatedTournament.registrationDate.to),
//               // },
//               // date: {
//               //   from: new Date(updatedTournament.date.from),
//               //   to: new Date(updatedTournament.date.to),
//               // },
//             }
//           : t
//       ),
//     }));
//   },

//   deleteTournament: async (id) => {
//     await fetch(`/api/tournaments/${id}`, {
//       method: "DELETE",
//       body: JSON.stringify(id),
//       headers: { "Content-Type": "application/json" },
//     });
//     set((state) => ({
//       tournaments: state.tournaments.filter((t) => t.id !== id),
//     }));
//   },

//   publishTournament: async (id) => {
//     const status = 1; // 1 is the status for published tournaments
//     const tournament = get().tournaments.find((t) => t.id === id);

//     if (!tournament) return;

//     const updatedTournament = { ...tournament, status };
//     await fetch(`/api/tournaments/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ id, updatedTournament }),
//       headers: { "Content-Type": "application/json" },
//     });
//     set((state) => ({
//       tournaments: state.tournaments.map((t) =>
//         t.id === id ? { ...t, status } : t
//       ),
//     }));
//   },
// }));

// export default useTournamentStore;
