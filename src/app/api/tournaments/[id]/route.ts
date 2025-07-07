import { fetchTournamentById, setTournamentDetails } from "@/app/(main)/tournament/services/tournament.service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const tournament = await fetchTournamentById(Number(id));

    // console.log("test tournament:", tournament);

    return NextResponse.json(tournament, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// UPDATE tournament by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    // console.log("Updating tournament with ID:", id);
    const data = await request.json();
    // console.log("Received data for update:", data);
    const tournament = await setTournamentDetails(Number(id), data);
    return NextResponse.json(tournament, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
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
