import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { ResponseData } from "@/types/common";
import dayjs from "dayjs";
import { ITournamentEvent } from "@/types/event";

const filePath = path.join(process.cwd(), "public/data", "tournamentEvents.json");
let responseData: ResponseData;

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET_API_TOURNAMENT_EVENTS] Error fetching tournament events: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tournamentEvents = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newTournamentEvent: ITournamentEvent = {
      ...data,
      status: 0,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate()
    };
    tournamentEvents.push(newTournamentEvent);
    fs.writeFileSync(filePath, JSON.stringify(tournamentEvents, null, 2));

    return NextResponse.json(newTournamentEvent, { status: 200 });
  } catch (error) {
    console.error("[POST_API_TOURNAMENT_EVENT] Error creating tournament event: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
