import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CONFIG.API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_CONFIG.AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_CONFIG.PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_CONFIG.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_CONFIG.MESSAGING_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_CONFIG.APP_ID,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

export default app;
