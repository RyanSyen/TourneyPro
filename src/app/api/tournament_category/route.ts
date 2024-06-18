import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { ICategory } from "@/app/tournament/(builder)/[id]/dashboard/category/category";
import { db } from "@/lib/firebase";
import { ResponseData } from "@/types/common";

const table = "tournament_category";
let responseData: ResponseData;

export async function GET(request: NextRequest) {
  try {
    const tournamentCategoryRef = collection(db, table);
    const searchParams = request.nextUrl.searchParams;
    const queryKey = searchParams.keys().next().value;
    const queryValue = searchParams.values().next().value;
    let q;
    let snapshot;
    let response;

    if (queryKey == null) {
      const q = tournamentCategoryRef;
      snapshot = await getDocs(q);
      response = snapshot.empty
        ? { message: [] }
        : {
            message: snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          };
    } else {
      switch (queryKey) {
        case "id":
          q = doc(db, table, queryValue);
          snapshot = await getDoc(q);
          if (!snapshot.exists()) {
            response = { message: null };
          } else {
            const data = snapshot.data();
            const category: ICategory = {
              id: snapshot.id,
              category: data.category,
              ageGroup: data.ageGroup,
              type: data.type,
              level: data.level,
              prize: data.prize,
              registrationFee: data.registrationFee,
              tournamentId: data.tournamentId,
            };
            response = { message: category };
          }
          break;
        case "tournamentId":
          q = query(
            tournamentCategoryRef,
            where("tournamentId", "==", queryValue)
          );
          snapshot = await getDocs(q);
          response = {
            message: snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          };
          break;
        default:
          console.error(`Invalid query key: ${queryKey}`);
      }
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[POST_API_USER] Error fetching tournaments: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryKey = searchParams.keys().next().value;
    const queryValue = searchParams.values().next().value;
    const data = await request.json();
    const tournamentCategoryRef = doc(db, table, data.id);
    await setDoc(tournamentCategoryRef, data);

    if (queryKey == "isUpdate" && queryValue) {
      console.log("[POST_API_TOURNAMENT_CATEGORY] Tournament Category updated");
      responseData = { success: true, message: "Tournament Category updated" };

      return NextResponse.json(responseData, { status: 200 });
    }

    console.log("[POST_API_TOURNAMENT_CATEGORY] Tournament Category added");
    responseData = { success: true, message: "Tournament Category added" };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error(
      "[POST_API_TOURNAMENT_CATEGORY] Error adding tournament category: ",
      error
    );

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryKey = searchParams.keys().next().value;
    const queryValue = searchParams.values().next().value;

    if (queryKey == "catId" && queryValue) {
      const tournamentCategoryRef = doc(db, table, queryValue);
      await deleteDoc(tournamentCategoryRef);
      console.log("[POST_API_TOURNAMENT_CATEGORY] Tournament Category deleted");
      responseData = { success: true, message: "Event Category deleted" };

      return NextResponse.json(responseData, { status: 200 });
    } else {
      console.error(
        "[POST_API_TOURNAMENT_CATEGORY] Invalid query key and/or query value: ",
        queryKey,
        queryValue
      );
    }
  } catch (error) {
    console.error(
      "[POST_API_TOURNAMENT_CATEGORY] Error adding tournament category: ",
      error
    );

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
