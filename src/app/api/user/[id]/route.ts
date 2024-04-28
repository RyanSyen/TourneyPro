import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/firebase";

interface UserDAO {
  Id: string;
  AccessToken: string;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Gender: string;
  Area: string;
  DateOfBirth: Date;
  ProfilePic: string;
  RoleId: string;
  IsEmailVerified: boolean;
  Language: string;
  JoinedDate: Date;
  LastLogin: Date;
  ModifiedDate: Date;
}

const table = "users";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userRef = doc(db, table, params.id);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("data: ", data);
    const user: UserDAO = {
      Id: data.Id,
      AccessToken: data.AccessToken,
      FullName: data.FullName,
      Email: data.Email,
      PhoneNumber: data.PhoneNumber,
      Gender: data.Gender,
      Area: data.Area,
      DateOfBirth: data.DateOfBirth,
      ProfilePic: data.ProfilePic,
      RoleId: data.RoleId,
      IsEmailVerified: data.IsEmailVerified,
      Language: data.Language,
      JoinedDate: data.JoinedDate,
      LastLogin: data.LastLogin,
      ModifiedDate: data.ModifiedDate,
    };
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userId = uuidv4();
    const userRef = doc(db, table, userId);
    await setDoc(userRef, data);

    console.log("[POST_API_USER] User Registered");

    return NextResponse.json(
      { success: true, message: "User registered" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST_API_USER] Error registering user: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    // console.log("data: ", data);
    const userRef = doc(db, table, data.id);
    await setDoc(userRef, data);

    console.log("[PUT_API_USER] User Updated");

    return NextResponse.json(
      { success: true, message: "User updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PUT_API_USER] Error registering user: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}
