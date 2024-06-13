import { ITournamentDetails } from "@/app/tournament/create/detailsForm";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tournament`;

export interface TournamentRequest extends ITournamentDetails {
  createdBy: string;
}

export const getAllTournaments = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw new Error(`Failed to get tournaments: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getTournamentById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`Failed to get tournaments: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getAllTournamentsByOrganizer = async (organizerId: string) => {
  try {
    const res = await fetch(`${BASE_URL}?orgId=${organizerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok)
      throw new Error(`Failed to get tournaments: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const createTournament = async (data: ITournamentDetails) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Failed to register: ${res.statusText}`);

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};
