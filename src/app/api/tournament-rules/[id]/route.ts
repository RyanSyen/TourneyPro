import { setTournamentRulesAndMatchSettings } from "@/services/tournament-service";
import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "../../../../../auth";
// import { headers } from "next/headers";
// import { updateTournamentDetails } from "@/services/tournamentService";

// UPDATE tournament by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    console.log("Updating tournament with ID:", id);
    const data = await request.json();
    console.log("Received data for update:", data);
    const tournament = await setTournamentRulesAndMatchSettings(Number(id), data);
    return NextResponse.json(tournament, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tournament rules", details: error },
      { status: 500 }
    );
  }
}

// // SOFT DELETE tournament by id
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: number }> }
// ) {
//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (session === null) {
//       throw new Error("User not authenticated");
//     }

//     const userId = session.user.id;

//     if (!userId) {
//       throw new Error("User not found");
//     }
//     const { id } = await params;
//     await prisma.tournament.update({
//       where: { id },
//       data: {
//         isDeleted: true,
//         deletedAt: new Date(),
//         deletedById: userId,
//       },
//     });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete tournament", details: error },
//       { status: 500 }
//     );
//   }
// }
