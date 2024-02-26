import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

interface UserRequest {
  id: string;
}

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
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}
