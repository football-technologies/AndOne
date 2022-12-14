const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const sentryWrapper = require("../../common/sentryErrorWrapper");
// const env = functions.config().basic.env;
// const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

module.exports = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onCall(
    sentryWrapper(async (data, context) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>> called hello");

      return { status: "OK" };
    })
  );
