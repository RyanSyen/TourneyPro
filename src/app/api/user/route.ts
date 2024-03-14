import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/firebase";

const table = "users";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  const userId = uuidv4();
  const userRef = doc(db, table, userId);
  const res = await setDoc(userRef, data);
  console.log("res: ", res);

  return NextResponse.json({ message: "User registered" }, { status: 200 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}
