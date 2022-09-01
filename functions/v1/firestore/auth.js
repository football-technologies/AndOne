const functions = require("firebase-functions").region("asia-northeast1");
const admin = require("firebase-admin");

const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Tokyo");

const sentryWrapper = require("../../common/sentryErrorWrapper");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

exports.onCreate = functions
  .runWith(runtimeOpts)
  .auth.user()
  .onCreate(
    sentryWrapper(async (auth) => {
      console.log(">>>>>>>>>> called v1.auth.onCreate", auth.uid, auth.email);

      const userId = createUID("user");

      await admin.auth().setCustomUserClaims(auth.uid, {
        status: 1,
        userId: userId,
      });

      admin.firestore().doc(`users/${userId}/secrets/${userId}`).set({
        id: userId,
        email: auth.email,
        address: null,
        status: 1,
        updatedAt: null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      admin.firestore().doc(`users/${userId}`).set({
        id: userId,
        status: 1,
        updatedAt: null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    })
  );

function createUID(idName) {
  const now = moment();
  const uuid = uuidv4().split("-")[0];
  const id = idName + "-" + now.format("YYYYMMDDHH") + "-" + uuid;
  return id;
}
