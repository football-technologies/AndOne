import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import { doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

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

    updateUser(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(doc(db, `users/${payload.id}`), payload, { merge: true });
    },

    readUsers(state, { type, payload }) {
      state.users = [...payload];
    },

    readUser(state, { type, payload }) {
      state.user = { ...payload };
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

      dispatch(readUsers(newUsers));
    });
  };
};

const fetchUser = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchUser");

    const unsubscribe = await onSnapshot(
      doc(db, "users", payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readUser(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const { create, updateUser, readUsers, readUser } = user.actions;
export { fetch, fetchUser };
export default user;
