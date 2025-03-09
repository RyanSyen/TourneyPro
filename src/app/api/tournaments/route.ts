import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { ResponseData } from "@/types/common";

const filePath = path.join(process.cwd(), "public/data", "tournaments.json");
let responseData: ResponseData;

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET_API_TOURNAMENTS] Error fetching tournaments: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tournaments = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newTournament = data;
    tournaments.push(newTournament);
    fs.writeFileSync(filePath, JSON.stringify(tournaments, null, 2));

    return NextResponse.json(newTournament, { status: 200 });
  } catch (error) {
    console.error("[POST_API_TOURNAMENT] Error creating tournament: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
