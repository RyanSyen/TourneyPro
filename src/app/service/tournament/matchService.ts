import dayjs from "dayjs";

import { IMatch } from "@/app/tournament/(builder)/[id]/dashboard/match/match";

export interface TournamentMatchRequest extends IMatch {
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/match_settings`;

export const getMatchSettingsByTournamentId = async (tournamentId: string) => {
  try {
    const res = await fetch(`${BASE_URL}?tournamentId=${tournamentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(
        `Failed to get tournament match settings: ${res.statusText}`
      );

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const setMatchSettings = async (data: IMatch) => {
  try {
    const payload: TournamentMatchRequest = {
      ...data,
      createdAt: dayjs().toString(),
      updatedAt: dayjs().toString(),
    };

    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok)
      throw new Error(`Failed to set match settings: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};
