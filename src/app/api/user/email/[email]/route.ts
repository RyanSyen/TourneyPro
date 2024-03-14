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
  const userRef = collection(db, table);
  const findUserByEmailQuery = query(
    userRef,
    where("email", "==", params.email)
  );
  const querySnapshot = await getDocs(findUserByEmailQuery);

  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    if (doc.exists()) {
      const data = doc.data();
      // console.log("data: ", data);
      /*
      data:  {
  email: 'yisyen123@gmail.com',
  area: 'Puchong, Selangor',
  phoneNumber: '601112836502',
  fullName: 'Ryan Wong',
  dob: '2024-03-09T16:00:00.000Z',
  gender: 'male'
}
      */
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
    }
  });

  return NextResponse.json({}, { status: 200 });
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
