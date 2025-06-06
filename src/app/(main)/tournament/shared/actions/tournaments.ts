'use server';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { TournamentSchema } from '@/form_schema/tournament';
import { ITournamentDetails } from '@/types/tournament';
import { revalidatePath } from 'next/cache';

type Tournament = z.infer<typeof TournamentSchema>;

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function fetchTournaments(): Promise<ITournamentDetails[]> {
  const res = await fetch(`${API_URL}/api/tournaments`);
  if (!res.ok) throw new Error('Failed to fetch tournaments');
  return res.json();
}

export async function fetchTournament(id: string): Promise<ITournamentDetails> {
  // const tournaments = await fetchTournaments();
  // return tournaments.find((t) => t.id === id);
  const res = await fetch(`${API_URL}/api/tournaments/${id}`);
  if (!res.ok) throw new Error('Failed to fetch tournament');
  const tournament = await res.json();
  return tournament;
}

export async function addTournament(tournament: Omit<Tournament, 'id'>): Promise<string> {
  const newTournament = { id: uuidv4(), ...tournament };
  const res = await fetch(`${API_URL}/api/tournaments`, {
    method: 'POST',
    body: JSON.stringify(newTournament),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to add tournament');
  revalidatePath('/tournaments');
  return newTournament.id;
}

export async function updateTournament(id: number, updatedTournament: Tournament): Promise<void> {
  await fetch(`${API_URL}/api/tournaments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, updatedTournament }),
    headers: { 'Content-Type': 'application/json' },
  });
  revalidatePath(`/tournaments/${id}`);
}

export async function deleteTournament(id: string): Promise<void> {
  await fetch(`${API_URL}/api/tournaments/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: { 'Content-Type': 'application/json' },
  });
  revalidatePath('/tournaments');
}

export async function publishTournament(id: number): Promise<void> {
  const tournaments = await fetchTournaments();
  const tournament = tournaments.find((t) => t.id === id);
  if (!tournament) return;

  const updatedTournament = { ...tournament, status: 1 }; // status: 1 = published

  await updateTournament(id, updatedTournament);
}
