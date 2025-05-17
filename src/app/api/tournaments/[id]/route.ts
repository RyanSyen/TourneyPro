import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ITournamentDetails } from "@/types/tournament";
import dayjs from "dayjs";
import { auth } from "@clerk/nextjs/server";
import { ResponseData } from "@/types/common";

let responseData: ResponseData;
const filePath = path.join(process.cwd(), "public/data", "tournaments.json");

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (data.length === 0) {
      return NextResponse.json(data);
    }

    const tournament = data.find(
      (t: ITournamentDetails) => t.id === id
    );

    return NextResponse.json(tournament);
  } catch (error) {
    console.error("[GET_API_TOURNAMENT] Error fetching tournament: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const tournaments = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const { userId } = await auth();

  const { id, updatedTournament } = await request.json();
  const data: ITournamentDetails = {
    ...updatedTournament,
    updatedAt: dayjs().toDate(),
    updatedBy: userId,
  };
  const index = tournaments.findIndex((t: ITournamentDetails) => t.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Tournament not found" },
      { status: 404 }
    );
  }

  tournaments[index] = { ...tournaments[index], ...data };
  fs.writeFileSync(filePath, JSON.stringify(tournaments, null, 2));

  return NextResponse.json(tournaments[index]);
}

export async function DELETE(request: NextRequest) {
  const id = await request.json();
  const tournaments = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedTournaments = tournaments.filter(
    (t: ITournamentDetails) => t.id !== id
  );
  fs.writeFileSync(filePath, JSON.stringify(updatedTournaments, null, 2));

  return new NextResponse(null, { status: 204 });
}
