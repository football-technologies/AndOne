const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = functions.config().service_account;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
    storageBucket: JSON.parse(process.env.FIREBASE_CONFIG).storageBucket,
  });
}
