import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

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
  { params }: { params: { email: string } }
) {
  // console.log("email: ", params.email);
  let data;
  const userRef = collection(db, table);
  const findUserByEmailQuery = query(
    userRef,
    where("email", "==", params.email)
  );
  const querySnapshot = await getDocs(findUserByEmailQuery);

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      data = { id: doc.id, ...doc.data() };
    }
  });

  if (querySnapshot.empty) {
    return NextResponse.json({}, { status: 200 });
  }

  return NextResponse.json(data, { status: 200 });
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
