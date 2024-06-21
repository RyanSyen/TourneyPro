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

import { db } from "@/lib/firebase";
import { ResponseData } from "@/types/common";

const table = "match_settings";
let responseData: ResponseData;

export async function GET(request: NextRequest) {
  try {
    const matchSettingsRef = collection(db, table);
    const searchParams = request.nextUrl.searchParams;
    const queryKey = searchParams.keys().next().value;
    const queryValue = searchParams.values().next().value;
    let q;
    let snapshot;
    let response;

    if (queryKey == null) {
      const q = matchSettingsRef;
      snapshot = await getDocs(q);
      response = snapshot.empty
        ? { message: [] }
        : {
            message: snapshot.docs.map((doc) => ({
              ...doc.data(),
            })),
          };
    } else {
      if (queryKey == "tournamentId") {
        // q = doc(db, table, queryValue);
        q = query(matchSettingsRef, where("tournamentId", "==", queryValue));
        snapshot = await getDocs(q);
        response = snapshot.empty
          ? { message: null }
          : {
              message: snapshot.docs[0].data(),
            };
      }
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[POST_API_USER] Error fetching match settings: ", error);

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
      console.log(
        "[POST_API_TOURNAMENT_MATCH_SETTINGS] Tournament Match Settings updated"
      );
      responseData = {
        success: true,
        message: "Tournament Match Settings updated",
      };

      return NextResponse.json(responseData, { status: 200 });
    }

    console.log(
      "[POST_API_TOURNAMENT_MATCH_SETTINGS] Tournament Match Settings added"
    );
    responseData = {
      success: true,
      message: "Tournament Match Settings added",
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error(
      "[POST_API_TOURNAMENT_MATCH_SETTINGS] Error adding tournament match settings: ",
      error
    );

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
