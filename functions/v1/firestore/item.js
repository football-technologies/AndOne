const functions = require("firebase-functions").region("asia-northeast1");
const sentryWrapper = require("../../common/sentryErrorWrapper");
const deleteMasterTag = require("../module/deleteMasterTag");
const _ = require("lodash");

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

      const isSameTags = _.isEqual(before.tags, after.tags);

      if (!isSameTags) {
        await deleteMasterTag({
          beforeTags: before.tags,
          afterTags: after.tags,
        });
      }
    })
  );
