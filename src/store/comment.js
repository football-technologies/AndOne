import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  query,
  collection,
  orderBy,
} from "firebase/firestore";

const comment = createSlice({
  name: "comment",
  initialState: {
    comment: null,
    comments: null,
  },
  reducers: {
    createComment(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(
        doc(db, `items/${payload.item.id}/comments/${payload.id}`),
        payload,
        { merge: true }
      );
    },

    updateComment(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(
        doc(db, `items/${payload.item.id}/comments/${payload.id}`),
        payload,
        { merge: true }
      );
    },

    deleteComment(state, { type, payload }) {
      deleteDoc(doc(db, `items/${payload.item.id}/comments/${payload.id}`));
    },

    readComment(state, { type, payload }) {
      state.comment = { ...payload };
    },

    readComments(state, { type, payload }) {
      state.comments = [...payload];
    },
  },
});

const fetchComments = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchTags", payload);

    const newComments = [];

    const q = payload.query;

    const unsubscribe = await onSnapshot(q, async (snapshot) => {
      if (snapshot) {
        await snapshot.docChanges().forEach(async (change) => {
          console.log(">>>>>>>> change", change);

          if (change.type === "added") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newComments.splice(newIndex, 0, change.doc.data());
            }
          }

          if (change.type === "modified") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newComments.splice(newIndex, 1, change.doc.data());
            }
          }
        });
      }

      dispatch(readComments(newComments));
    });

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const {
  createComment,
  updateComment,
  deleteComment,
  readComment,
  readComments,
} = comment.actions;
export { fetchComments };
export default comment;
