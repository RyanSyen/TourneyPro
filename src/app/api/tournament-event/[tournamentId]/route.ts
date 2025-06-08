import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { ITournamentEvent } from "@/types/event";
import { ResponseData } from "@/types/common";

const filePath = path.join(
  process.cwd(),
  "public/data",
  "tournamentEvents.json"
);
let responseData: ResponseData;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tournamentId: number }> }
) {
  try {
    const { tournamentId } = await params;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    // console.log("data: ", data);

    if (data.length === 0) {
      return NextResponse.json(data);
    }

    const events = data.filter(
      (t: ITournamentEvent) => t.tournamentId === tournamentId
    );

    return NextResponse.json(events);
  } catch (error) {
    console.error(
      "[GET_API_TOURNAMENT_EVENT] Error fetching tournament event: ",
      error
    );

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const tournamentEvents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedTournamentEvent = await request.json();
  const data: ITournamentEvent = {
    ...updatedTournamentEvent,
    updatedAt: dayjs().toDate(),
  };
  const index = tournamentEvents.findIndex(
    (t: ITournamentEvent) => t.id === updatedTournamentEvent.id
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "Tournament event not found" },
      { status: 404 }
    );
  }

  tournamentEvents[index] = { ...tournamentEvents[index], ...data };
  fs.writeFileSync(filePath, JSON.stringify(tournamentEvents, null, 2));

  return NextResponse.json(tournamentEvents[index]);
}

export async function DELETE(request: NextRequest) {
  const id = await request.json();
  const tournamentEvents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedTournamentEvent = tournamentEvents.filter(
    (t: ITournamentEvent) => t.id !== id
  );
  fs.writeFileSync(filePath, JSON.stringify(updatedTournamentEvent, null, 2));

  return new NextResponse(null, { status: 204 });
}
