import { setupDraftTournament } from "@/app/(main)/tournament/services/tournament.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tournament = await setupDraftTournament(data);
    return NextResponse.json(tournament, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/tournaments:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
