import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";
import { cert, FirebaseError } from "firebase-admin/app";

import serviceAccount from "../firebase/tourneypro1007-firebase-adminsdk-98ead-b6bb23a5bf.json";

// export const firestore = initFirestore({
//   credential: cert({
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
//       ? process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
//       : undefined,
//   }),
// });

if (admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        "../firebase/tourneypro1007-firebase-adminsdk-98ead-b6bb23a5bf.json"
      ),
    });
  } catch (error: any) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export default admin.firestore;
