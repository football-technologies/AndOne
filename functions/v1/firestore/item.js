const functions = require("firebase-functions").region("asia-northeast1");
const admin = require("firebase-admin");
const sentryWrapper = require("../../common/sentryErrorWrapper");
const deleteMasterTag = require("../module/deleteMasterTag");

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

exports.onUpdate = functions
  .runWith(runtimeOpts)
  .firestore.document("/items/{itemId}")
  .onUpdate(
    sentryWrapper(async (snapshot, context) => {
      console.log(">>>>>>>>>>>>> called item.onUpdate");

      const before = snapshot.before.data();
      const after = snapshot.after.data();

      if (before.tags !== after.tags) {
        await deleteMasterTag({
          beforeTags: before.tags,
          afterTags: after.tags,
        });
      }

      console.log(">>>>>>>>>>>>> finish item.onUpdate");
    })
  );
