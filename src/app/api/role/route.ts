import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

interface Role {
  id: number;
  name: string;
}

const roleRef = collection(db, "role");

export async function GET(request: NextRequest) {
  var roleList: Role[] = [];

  const q = query(roleRef, orderBy("id", "asc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.docs.forEach((doc) => {
    const role: Role = {
      id: doc.data().id,
      name: doc.data().name,
    };
    roleList.push(role);
  });

  return NextResponse.json(roleList, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log("data", data);

  const docRef = await addDoc(roleRef, data);

  return NextResponse.json(
    { message: `Document written in ID: , ${docRef.id}` },
    { status: 200 }
  );
}
