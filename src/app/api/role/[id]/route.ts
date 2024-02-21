import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

interface Role {
  id: number;
  name: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const roleRef = doc(db, "role", params.id);
  const docSnap = await getDoc(roleRef);
  const role: Role = {
    id: docSnap.data()?.id,
    name: docSnap.data()?.name,
  };
  return NextResponse.json(role, { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const roleRef = doc(db, "role", params.id);
  const docSnapshot = await updateDoc(roleRef, data);

  return NextResponse.json({ message: docSnapshot }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const roleRef = doc(db, "role", params.id);
  const docSnapshot = await deleteDoc(roleRef);

  return NextResponse.json({ message: docSnapshot }, { status: 200 });
}
