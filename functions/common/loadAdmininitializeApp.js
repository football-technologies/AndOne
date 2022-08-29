const admin = require("firebase-admin");
const { applicationDefault } = require("firebase-admin");
const functions = require("firebase-functions");
// const serviceAccount = functions.config().service_account;

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    credential: applicationDefault(),
    databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
    storageBucket: JSON.parse(process.env.FIREBASE_CONFIG).storageBucket,
  });
}
