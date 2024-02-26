import admin from "firebase-admin";

// previously firestore admin is used for next auth to insert user records, sessions and accounts into firestore when user sign in or sign up
// not using but keep code for future use

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

export default admin.firestore();
