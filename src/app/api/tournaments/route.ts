import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { createTournament } from "@/services/tournamentService";

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      where: { isDeleted: false },
      include: { rules: true, events: true },
    });
    return NextResponse.json(tournaments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tournaments', details: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // try {
  //   const { userId } = await auth();
  //   const data = await request.json();
  //   const tournament = await prisma.tournament.create({
  //     data: {
  //       ...data,
  //       createdById: userId,
  //       updatedById: userId,
  //     },
  //   });
  //   return NextResponse.json(tournament);
  // } catch (error) {
  //   return NextResponse.json({ error: 'Failed to create tournament', details: error }, { status: 500 });
  // }
  try {
    const data = await request.json();
    const tournament = await createTournament(data);
    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tournament." }, { status: 500 });
  }
}
