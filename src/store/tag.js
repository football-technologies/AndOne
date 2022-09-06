import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
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
  },
});

const fetchTag = (payload) => {
  // return async (dispatch, getState) => {
  //   console.log(">>>>>>>>> called fetchUser");
  //   const unsubscribe = await onSnapshot(
  //     doc(db, "users", payload.query),
  //     async (doc) => {
  //       if (doc.id) {
  //         dispatch(readUser(doc.data()));
  //       }
  //     }
  //   );
  //   if (payload.type === "delete") {
  //     unsubscribe();
  //   }
  // };
};

export const { createTag, updateTag, deleteTag } = tag.actions;
export { fetchTag };
export default tag;
