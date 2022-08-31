import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/plugins/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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
  },
});

const { createSecret } = secret.actions;

export { createSecret };
export default secret;
