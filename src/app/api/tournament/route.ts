import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/firebase";
import { ResponseData } from "@/types/common";

const table = "tournament";
let responseData: ResponseData;

export interface UsersResponse {
  message: any[];
  success: boolean;
}

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, table));
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const resData: UsersResponse = { message: docs, success: true };

    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    console.error("[POST_API_USER] Error fetching all users: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tournamentId = uuidv4();
    const userRef = doc(db, table, tournamentId);
    await setDoc(userRef, data);

    console.log("[POST_API_TOURNAMENT] Tournament Created");

    responseData = { success: true, message: "Tournament created" };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("[POST_API_TOURNAMENT] Error creating tournament: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
