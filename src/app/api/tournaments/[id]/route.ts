import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { headers } from "next/headers";

// GET tournament by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: { rules: true, events: true },
    });
    if (!tournament || tournament.isDeleted) {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tournament", details: error },
      { status: 500 }
    );
  }
}

// UPDATE tournament by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session === null) {
      throw new Error("User not authenticated");
    }

    let userId = session.user.id;

    if (!userId) {
      throw new Error("User not found");
    }
    const { id } = await params;
    const data = await request.json();
    const tournament = await prisma.tournament.update({
      where: { id },
      data: {
        ...data,
        updatedById: userId,
      },
    });
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tournament", details: error },
      { status: 500 }
    );
  }
}

// SOFT DELETE tournament by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session === null) {
      throw new Error("User not authenticated");
    }

    let userId = session.user.id;

    if (!userId) {
      throw new Error("User not found");
    }
    const { id } = await params;
    await prisma.tournament.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedById: userId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete tournament", details: error },
      { status: 500 }
    );
  }
}
