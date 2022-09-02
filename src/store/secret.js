import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/plugins/firebase";
import { doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const secret = createSlice({
  name: "secret",
  initialState: {
    secret: null,
    secrets: null,
  },
  reducers: {
    createSecret(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `users/${payload.id}/secrets/${payload.id}`), payload, {
        merge: true,
      });
    },
    readSecret(state, { type, payload }) {
      state.secret = { ...payload };
    },
  },
});

const fetchSecret = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchSecret");

    const unsubscribe = await onSnapshot(
      doc(db, `users/${payload.query}/secrets`, payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readSecret(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const { createSecret, readSecret } = secret.actions;

export { fetchSecret };
export default secret;
