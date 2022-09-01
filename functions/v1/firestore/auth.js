const functions = require("firebase-functions").region("asia-northeast1");
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
    })
  );