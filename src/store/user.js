import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/plugins/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: null,
  },
  reducers: {
    create(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `users/${payload.id}`), payload, { merge: true });
    },

    read(state, { type, payload }) {
      state.users = [...payload];
    },
  },
});

const fetch = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetch");

    const newUsers = [];
    // const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const q = payload.query;
    const unsubscribe = await onSnapshot(q, async (snapshot) => {
      if (snapshot) {
        await snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newUsers.splice(newIndex, 0, change.doc.data());
            }
          }

          if (change.type === "modified") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newUsers.splice(newIndex, 1, change.doc.data());
            }
          }
        });
      }

      dispatch(read(newUsers));
    });
  };
};

const { create, read } = user.actions;

export { create, read, fetch };
export default user;
