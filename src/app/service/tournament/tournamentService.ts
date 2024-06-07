import { ITournamentDetails } from "@/app/tournament/create/detailsForm";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tournament`;

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
