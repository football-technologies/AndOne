const admin = require("firebase-admin");
const sentryWrapper = require("../../common/sentryErrorWrapper");
const _ = require("lodash");

module.exports = sentryWrapper(async function ({beforeTags, afterTags}) {
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
});
