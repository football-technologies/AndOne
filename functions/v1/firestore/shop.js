const functions = require("firebase-functions").region("asia-northeast1");
const sentryWrapper = require("../../common/sentryErrorWrapper");
const deleteMasterTag = require("../module/deleteMasterTag");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

exports.onUpdate = functions
  .runWith(runtimeOpts)
  .firestore.document("/shops/{shopId}")
  .onUpdate(
    sentryWrapper(async (snapshot, context) => {
      console.log(">>>>>>>>>>>>> called shop.onUpdate");

      const before = snapshot.before.data();
      const after = snapshot.after.data();

      if (before.tags !== after.tags) {
        await deleteMasterTag({
          beforeTags: before.tags,
          afterTags: after.tags,
        });
      }

      console.log(">>>>>>>>>>>>> finish shop.onUpdate");
    })
  );
