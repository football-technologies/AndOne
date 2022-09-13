import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage } from "firebase/storage";

const REGION_TOKYO = "asia-northeast1";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const apps = getApps();
if (!apps.length) {
  initializeApp(config);
}

const functions = getFunctions();
functions.region = REGION_TOKYO;
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, functions, storage };

if (process.env.NODE_ENV === "development") {
  //emulator設定
  connectFunctionsEmulator(functions, "localhost", 5001);
  // connectFirestoreEmulator(db, "localhost", 8080);
  // connectAuthEmulator(auth, "http://localhost:9099");
}
