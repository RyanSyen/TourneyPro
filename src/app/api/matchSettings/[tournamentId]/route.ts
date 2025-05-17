import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IMatchSettings } from "@/types/matchSetting";
import dayjs from "dayjs";
import { ResponseData } from "@/types/common";

const filePath = path.join(process.cwd(), "public/data", "matchSettings.json");
let responseData: ResponseData;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tournamentId: string }> }
) {
  try {
    const { tournamentId } = await params;
    console.log("tournamentId: ", tournamentId);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    // const index = data.findIndex(
    //   (t: IMatchSettings) => t.tournamentId === tournamentId
    // );

    // if (index === -1) {
    //   return NextResponse.json(
    //     { error: "Match Settings not found" },
    //     { status: 404 }
    //   );
    // }
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error(
      "[GET_API_MATCH_SETTINGS] Error fetching matchSettings: ",
      error
    );

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const matchSettings = JSON.parse(fs.readFileSync(filePath, "utf8"));
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { tournamentId, updatedMatchSettings } = await request.json();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const data: IMatchSettings = {
    ...updatedMatchSettings,
    updatedAt: dayjs().toDate(),
  };
  // const index = matchSettings.findIndex(
  //   (t: IMatchSettings) => t.tournamentId === tournamentId
  // );

  // if (index === -1) {
  //   return NextResponse.json(
  //     { error: "Match Settings not found" },
  //     { status: 404 }
  //   );
  // }

  // matchSettings[index] = { ...matchSettings[index], ...data };
  fs.writeFileSync(filePath, JSON.stringify(matchSettings, null, 2));

  return NextResponse.json(matchSettings[0]);
}
