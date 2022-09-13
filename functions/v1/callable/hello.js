const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sentryWrapper = require("../../common/sentryErrorWrapper");
const env = functions.config().basic.env;
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

// const dictionary = require("../helpers/dictionary");
// const scheme = require("../helpers/scheme");

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

      admin
        .firestore()
        .collectionGroup("comments")
        .get()
        .then((snapshots) => {
          snapshots.forEach(async (doc) => {
            if (doc.id) {
              const comment = doc.data();

              const item = await admin
                .firestore()
                .doc(`items/${comment.item.id}`)
                .get()
                .then((d) => {
                  if (d.id) {
                    return d.data();
                  }
                });

              if (item) {
                admin
                  .firestore()
                  .doc(`items/${comment.item.id}/comments/${comment.id}`)
                  .set(
                    {
                      shop: {
                        id: item.shop.id,
                        name: item.shop.name,
                        icon: item.shop.icon,
                        ref: admin.firestore().doc(`shops/${item.shop.id}`),
                      },
                    },
                    { merge: true }
                  );
              }
            }
          });
        });

      return { status: "OK" };
    })
  );
