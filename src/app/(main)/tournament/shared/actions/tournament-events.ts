// // app/actions/tournament-events.ts
// 'use server';

// import { TournamentEvent } from "@/form_schema/event";
// import { revalidatePath } from "next/cache";
// import { v4 as uuidv4 } from "uuid";

// export async function fetchTournamentEvents(tournamentId: string): Promise<TournamentEvent[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tournament-event/${tournamentId}`);
//   const data = await res.json();
//   return data;
// }

// export async function addTournamentEvent(tournamentId: string, event: TournamentEvent): Promise<string> {
//   event.id = uuidv4();
//   await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tournament-event`, {
//     method: "POST",
//     body: JSON.stringify({ tournamentId, event }),
//     headers: { "Content-Type": "application/json" },
//   });
//   // const data = await res.json();
//   revalidatePath(`/tournament/${tournamentId}`); // optional cache busting
//   return event.id;
// }

// export async function updateTournamentEvent(tournamentId: string, updatedEvent: TournamentEvent): Promise<void> {
//   await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tournament-event/${tournamentId}`, {
//     method: "PUT",
//     body: JSON.stringify(updatedEvent),
//     headers: { "Content-Type": "application/json" },
//   });
//   revalidatePath(`/tournament/${tournamentId}`);
// }

// export async function deleteTournamentEvent(tournamentId: string, id: string): Promise<void> {
//   await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tournament-event/${tournamentId}`, {
//     method: "DELETE",
//     body: JSON.stringify(id),
//     headers: { "Content-Type": "application/json" },
//   });
//   revalidatePath(`/tournament/${tournamentId}`);
// }
