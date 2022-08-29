import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const REGION_TOKYO = "asia-northeast1";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log(">>>>>>>>>> called firebase.js", config);

const apps = getApps();
if (!apps.length) {
  initializeApp(config);
}

const functions = getFunctions();
functions.region = REGION_TOKYO;
const db = getFirestore();
const auth = getAuth();

export { db, auth, functions };

if (process.env.NODE_ENV === "development") {
  //emulator設定
  connectFunctionsEmulator(functions, "localhost", 5001);
  // connectFirestoreEmulator(db, "localhost", 8080);
  // connectAuthEmulator(auth, "http://localhost:9099");
}
