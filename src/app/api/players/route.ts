import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { ResponseData } from "@/types/common";
import { IPlayer } from "@/types/player";

const filePath = path.join(process.cwd(), "public/data", "players.json");
let responseData: ResponseData;

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    // console.log("[GET_API_PLAYERS] players: ", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET_API_PLAYERS] Error fetching players: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // console.log("data:", data);
    const matchSettings = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newMatchSettings: IPlayer = {
      tournamentId: data,
      ...data,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    };

    matchSettings.push(newMatchSettings);
    fs.writeFileSync(filePath, JSON.stringify(matchSettings, null, 2));

    return NextResponse.json(newMatchSettings, { status: 200 });
  } catch (error) {
    console.error("[POST_API_MATCH_SETTINGS] Error creating player: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
