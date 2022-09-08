const functions = require("firebase-functions").region("asia-northeast1");
const admin = require("firebase-admin");
const sentryWrapper = require("../../common/sentryErrorWrapper");

const _ = require("lodash");

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
        await deleteMasterTag(before.tags, after.tags);
      }

      console.log(">>>>>>>>>>>>> finish shop.onUpdate");
    })
  );

async function deleteMasterTag(beforeTags, afterTags) {
  console.log("<<<<<<<<<< called deleteMasterTag");

  for (const beforeTag of beforeTags) {
    const matchedTag = await _.find(afterTags, (afterTag) => {
      if (beforeTag.name === afterTag.name) {
        return afterTag;
      }
    });

    if (!matchedTag) {
      const sameNameTags = [];

      await admin
        .firestore()
        .collection("tags")
        .where("name", "==", beforeTag.name)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.id) {
              sameNameTags.push(doc.data());
            }
          });
        });

      if (sameNameTags.length === 1) {
        admin.firestore().doc(`tags/${beforeTag.id}`).delete();
      }
    }
  }
}
