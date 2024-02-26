import admin from "firebase-admin";

if (admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        "./tourneypro1007-firebase-adminsdk-98ead-b6bb23a5bf.json"
      ),
    });
  } catch (error: any) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export default admin.firestore;
