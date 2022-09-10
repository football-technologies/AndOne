import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";

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

    updateSecret(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(doc(db, `users/${payload.id}/secrets/${payload.id}`), payload, {
        merge: true,
      });
    },

    readSecret(state, { type, payload }) {
      state.secret = { ...payload };
    },

    readSecrets(state, { type, payload }) {
      state.secrets = [...payload];
    },
  },
});

const fetchSecret = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchSecret");

    let unsubscribe = null;

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readSecret(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readSecret(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchSecrets = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchSecrets");

    let unsubscribe = null;
    const newSecrets = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newSecrets.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newSecrets.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readSecrets(newSecrets));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newSecrets.push(doc.data());
          }
        });
      });
      dispatch(readSecrets(newSecrets));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { createSecret, updateSecret, readSecret, readSecrets } =
  secret.actions;

export { fetchSecret, fetchSecrets };
export default secret;
