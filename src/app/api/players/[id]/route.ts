import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { ResponseData } from "@/types/common";
import { IPlayer } from "@/types/player";

const filePath = path.join(process.cwd(), "public/data", "players.json");
let responseData: ResponseData;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const { playerId } = await params;
    console.log("tournamentId: ", playerId);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = data.findIndex(
      (t: IPlayer) => t.id === playerId
    );

    if (index === -1) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data[index]);
  } catch (error) {
    console.error(
      "[GET_API_PLAYERS] Error fetching player: ",
      error
    );

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const players = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const { playerId, updatedMatchSettings } = await request.json();
  const data: IPlayer = {
    ...updatedMatchSettings,
    updatedAt: dayjs().toDate(),
  };
  const index = players.findIndex(
    (t: IPlayer) => t.id === playerId
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "Player not found" },
      { status: 404 }
    );
  }

  players[index] = { ...players[index], ...data };
  fs.writeFileSync(filePath, JSON.stringify(players, null, 2));

  return NextResponse.json(players[index]);
}
