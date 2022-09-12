const functions = require("firebase-functions").region("asia-northeast1");
const sentryWrapper = require("../../common/sentryErrorWrapper");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

exports.onUpdate = functions
  .runWith(runtimeOpts)
  .firestore.document("/items/{itemId}/biddings/{biddingId}")
  .onUpdate(
    sentryWrapper(async (snapshot, context) => {
      console.log(">>>>>>>>>>>>> called bidding.onUpdate");
    })
  );