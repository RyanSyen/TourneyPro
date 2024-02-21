import { NextRequest, NextResponse } from "next/server";

interface UserRequest {
  id: string;
}

export async function GET(
  request: NextRequest,
  context: { params: UserRequest }
) {
  return NextResponse.json({ message: context.params.id }, { status: 200 });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}
