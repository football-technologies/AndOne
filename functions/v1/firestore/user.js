const functions = require("firebase-functions").region("asia-northeast1");
const admin = require("firebase-admin");
const sentryErrorWrapper = require("../../common/sentryErrorWrapper");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

exports.onCreate = functions
  .runWith(runtimeOpts)
  .firestore.document("users/{userId}")
  .onCreate(
    sentryErrorWrapper(async (snapshot, context) => {
      console.log(">>>>>>>>>>> called user.onCreate");

      await admin
        .auth()
        .createUser({
          uid: snapshot.get("id"),
          email: snapshot.get("email"),
          emailVerified: true,
          displayName: snapshot.get("screenName"),
        })
        .then((userRecord) => {
          console.log(">>>>>> Successfully created new user:", userRecord.uid);
        })
        .catch((error) => {
          console.log(">>>>>> Error creating new user:", error);
        });
    })
  );
