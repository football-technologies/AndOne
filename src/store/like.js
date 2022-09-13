import { db } from "@/plugins/firebase";
import { createSlice } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  getDocs,
  getDoc,
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

const fetchLike = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchLike");

    let unsubscribe = null;

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readLike(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readLike(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchLikes = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchLikes");

    let unsubscribe = null;
    const newLikes = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newLikes.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newLikes.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readLikes(newLikes));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newLikes.push(doc.data());
          }
        });
      });
      dispatch(readLikes(newLikes));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { createLike, updateLike, deleteLike, readLike, readLikes } =
  like.actions;
export { fetchLike, fetchLikes };
export default like;
