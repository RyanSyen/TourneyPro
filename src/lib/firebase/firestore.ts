import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
      ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
  }),
});
