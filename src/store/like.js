import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const like = createSlice({
  name: "like",
  initialState: {
    like: null,
    likes: null,
  },
  reducers: {
    createLike(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `users/${payload.user.id}/likes/${payload.id}`), payload, {
        merge: true,
      });
    },

    updateLike(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(doc(db, `users/${payload.user.id}/likes/${payload.id}`), payload, {
        merge: true,
      });
    },

    deleteLike(state, { type, payload }) {
      deleteDoc(doc(db, `users/${payload.user.id}/likes/${payload.id}`));
    },

    readLike(state, { type, payload }) {
      state.like = { ...payload };
    },

    readLikes(state, { type, payload }) {
      state.likes = [...payload];
    },
  },
});

const fetchLike = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchLike");

    const unsubscribe = await onSnapshot(
      doc(db, payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readLike(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

const fetchLikes = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchLikes");

    const newlikes = [];
    const q = payload.query;

    await getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id) {
          newlikes.push(doc.data());
        }
      });
    });

    dispatch(readLikes(newlikes));

    // const unsubscribe = await onSnapshot(q, async (snapshot) => {
    //   if (snapshot) {
    //     await snapshot.docChanges().forEach(async (change) => {
    //       // console.log(
    //       //   ">>>>>>>>>>>> change.type",
    //       //   change.type,
    //       //   change.newIndex,
    //       //   change.doc.data()
    //       // );

    //       if (change.type === "added") {
    //         if (change.doc.data().id) {
    //           const newIndex = change.newIndex;
    //           newlikes.splice(newIndex, 0, change.doc.data());
    //         }
    //       }

    //       if (change.type === "modified") {
    //         if (change.doc.data().id) {
    //           const newIndex = change.newIndex;
    //           newlikes.splice(newIndex, 1, change.doc.data());
    //         }
    //       }
    //     });
    //   }

    //   dispatch(readLikes(newlikes));
    // });

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const { createLike, updateLike, deleteLike, readLike, readLikes } =
  like.actions;
export { fetchLike, fetchLikes };
export default like;
