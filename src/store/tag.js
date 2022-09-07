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

const tag = createSlice({
  name: "tag",
  initialState: {
    tag: null,
    tags: null,
  },
  reducers: {
    createTag(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `tags/${payload.id}`), payload, { merge: true });
    },

    updateTag(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(doc(db, `tags/${payload.id}`), payload, { merge: true });
    },

    deleteTag(state, { type, payload }) {
      deleteDoc(doc(db, `tags/${payload.id}`));
    },

    readTag(state, { type, payload }) {
      state.tag = { ...payload };
    },

    readTags(state, { type, payload }) {
      state.tags = [...payload];
    },
  },
});

const fetchTag = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchTag");

    const unsubscribe = await onSnapshot(
      doc(db, payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readTag(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

const fetchTags = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchTags", payload);

    const newTags = [];

    const q = payload.query;

    const unsubscribe = await onSnapshot(q, async (snapshot) => {
      if (snapshot) {
        await snapshot.docChanges().forEach(async (change) => {
          console.log(">>>>>>>> change", change);

          if (change.type === "added") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newTags.splice(newIndex, 0, change.doc.data());
            }
          }

          if (change.type === "modified") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newTags.splice(newIndex, 1, change.doc.data());
            }
          }
        });
      }

      dispatch(readTags(newTags));
    });

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const { createTag, updateTag, deleteTag, readTag, readTags } =
  tag.actions;
export { fetchTag, fetchTags };
export default tag;
