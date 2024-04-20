import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/firebase";
import { ResponseData } from "@/types/common";

const table = "users";
let responseData: ResponseData;

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, table));
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ message: docs }, { status: 200 });
  } catch (error) {
    console.error("[POST_API_USER] Error fetching all users: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userId = uuidv4();
    const userRef = doc(db, table, userId);
    await setDoc(userRef, data);

    console.log("[POST_API_USER] User Registered");

    responseData = { success: true, message: "User registered" };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("[POST_API_USER] Error registering user: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
