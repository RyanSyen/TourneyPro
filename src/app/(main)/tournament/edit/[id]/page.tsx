import { auth } from "@clerk/nextjs/server";
import EditTournamentTabs from "./tabs";

const MainPage = async () => {
  try {
    const { userId } = await auth();

    const clerkApiUrl = `${process.env.NEXT_PUBLIC_CLERK_BE_API}/users/${userId}`;
    const clerkSecretKey = process.env.CLERK_SECRET_KEY;

    if (!clerkApiUrl || !clerkSecretKey) {
      console.error("Clerk API URL or Secret Key not configured.");
      return new Response("Internal Server Error", { status: 500 });
    }

    const response = await fetch(clerkApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clerkSecretKey}`,
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch user data from Clerk API: ${response.status} - ${response.statusText}`
      );
      // Consider returning a user-friendly error message or a specific error response
      return new Response(`Failed to fetch user data`, {
        status: response.status,
      });
    }

    const user = await response.json();
    const username = `${user.first_name} ${user.last_name}`;

    return <EditTournamentTabs username={username} />;
  } catch (error) {
    console.error("Error fetching user data from Clerk API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export default MainPage;
