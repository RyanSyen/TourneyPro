import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { ITournamentDetails } from "@/app/tournament/(builder)/create/detailsForm";
import { db } from "@/lib/firebase";
import { ResponseData } from "@/types/common";

const table = "tournament";
let responseData: ResponseData;

export async function GET(request: NextRequest) {
  try {
    const tournamentRef = collection(db, table);

    const searchParams = request.nextUrl.searchParams;
    const queryKey = searchParams.keys().next().value;
    const queryValue = searchParams.values().next().value;
    let q;
    let snapshot;
    let response;

    // console.log("queryKey: ", queryKey);
    // console.log("queryValue: ", queryValue);

    if (queryKey == null) {
      const q = tournamentRef;
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
            const tournament: ITournamentDetails = {
              id: snapshot.id,
              title: data.title,
              description: data.description,
              thumbnail: data.thumbnail,
              isPublic: data.isPublic,
              type: data.type,
              startDate: data.startDate,
              endDate: data.endDate,
              location: data.location,
              organizer: data.organizer,
              status: data.status,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };
            response = { message: tournament };
          }
          break;
        case "orgId":
          q = query(tournamentRef, where("organizer", "==", queryValue));
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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const userRef = doc(db, table, data.id);
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
