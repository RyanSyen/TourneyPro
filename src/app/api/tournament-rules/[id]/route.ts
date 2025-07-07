import { fetchTournamentRulesAndMatchSettings, setTournamentRulesAndMatchSettings } from "@/app/(main)/tournament/services/tournament.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const data = await fetchTournamentRulesAndMatchSettings(Number(id));

    // console.log("get rules from api:", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// UPDATE tournament by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    console.log("Updating tournament with ID:", id);
    const data = await request.json();
    console.log("Received data for update:", data);
    const tournament = await setTournamentRulesAndMatchSettings(Number(id), data);
    return NextResponse.json(tournament, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tournament rules", details: error },
      { status: 500 }
    );
  }
}
