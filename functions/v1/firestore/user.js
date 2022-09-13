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
    })
  );

exports.onUpdate = functions
  .runWith(runtimeOpts)
  .firestore.document("users/{userId}")
  .onUpdate(
    sentryErrorWrapper(async (snapshot, context) => {
      console.log(">>>>>>>>>>> called user.onUpdate");

      const before = snapshot.before.data();
      const after = snapshot.after.data();

      if (
        before.displayName !== after.displayName ||
        before.icon !== after.icon
      ) {
        await updateComments(after);
        await updateLikes(after);
        await updateBiddings(after);
        // await updateItems(after);
        // await updateRatings(after);
      }
    })
  );

async function updateComments(after) {
  const comments = [];
  await admin
    .firestore()
    .collectionGroup("comments")
    .where("user.id", "==", after.id)
    .get()
    .then((snapshot) => {
      snapshot.forEach(async (doc) => {
        if (doc.id) {
          comments.push(doc.data());
        }
      });
    });

  for (const comment of comments) {
    admin
      .firestore()
      .doc(`items/${comment.item.id}/comments/${comment.id}`)
      .set(
        {
          user: {
            name: after.displayName,
            icon: after.icon,
          },
        },
        { merge: true }
      );
  }
}

async function updateLikes(after) {
  const likes = [];
  await admin
    .firestore()
    .collection(`users/${after.id}/likes`)
    .get()
    .then((snapshot) => {
      snapshot.forEach(async (doc) => {
        if (doc.id) {
          likes.push(doc.data());
        }
      });
    });

  for (const like of likes) {
    admin
      .firestore()
      .doc(`users/${like.user.id}/likes/${like.id}`)
      .set(
        {
          user: {
            name: after.displayName,
            icon: after.icon,
          },
        },
        { merge: true }
      );
  }
}

async function updateBiddings(after) {
  const biddings = [];
  await admin
    .firestore()
    .collectionGroup("biddings")
    .where("user.id", "==", after.id)
    .get()
    .then((snapshot) => {
      snapshot.forEach(async (doc) => {
        if (doc.id) {
          biddings.push(doc.data());
        }
      });
    });

  for (const bidding of biddings) {
    admin
      .firestore()
      .doc(`items/${bidding.item.id}/biddings/${bidding.id}`)
      .set(
        {
          user: {
            name: after.displayName,
            icon: after.icon,
          },
        },
        { merge: true }
      );
  }
}

// async function updateItems(after) {
//   const items = [];
//   await admin
//     .firestore()
//     .collection("items")
//     .where("sold.user.id", "==", after.id)
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach(async (doc) => {
//         if (doc.id) {
//           items.push(doc.data());
//         }
//       });
//     });

//   for (const item of items) {
//     admin
//       .firestore()
//       .doc(`items/${item.id}`)
//       .set(
//         {
//           sold: {
//             user: {
//               name: after.displayName,
//               icon: after.icon,
//             },
//           },
//         },
//         { merge: true }
//       );
//   }
// }

// async function updateRating(after) {
//   console.log(">>>>>>>>>> update Rating");
//   const ratings = [];
//   await admin
//     .firestore()
//     .collectionGroup("ratings")
//     .where("user.id", "==", after.id)
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach(async (doc) => {
//         if (doc.id) {
//           ratings.push(doc.data());
//         }
//       });
//     });

//   for (const rating of ratings) {
//     admin
//       .firestore()
//       .doc(`items/${rating.item.id}/ratings/${rating.id}`)
//       .set(
//         {
//           user: {
//             name: after.displayName,
//             icon: after.icon,
//           },
//         },
//         { merge: true }
//       );
//   }
// }
