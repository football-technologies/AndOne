import { db } from "@/plugins/firebase";
import { createSlice } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";

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

    readUser(state, { type, payload }) {
      state.user = { ...payload };
    },
    readUsers(state, { type, payload }) {
      state.users = [...payload];
    },
  },
});

const fetchUser = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchUser");

    let unsubscribe = null;

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readUser(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readUser(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchUsers = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchUsers");

    let unsubscribe = null;
    const newUsers = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
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
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newUsers.push(doc.data());
          }
        });
      });
      dispatch(readUsers(newUsers));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { create, updateUser, readUsers, readUser } = user.actions;
export { fetchUser, fetchUsers };
export default user;
