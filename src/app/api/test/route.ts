import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const lists = await prisma.test.findMany();
  return NextResponse.json({ lists });
}

export async function POST(request: Request) {
  const {} = await request.json();
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}
