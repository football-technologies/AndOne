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

const fetchTag = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    let unsubscribe = null;

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readTag(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readTag(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchTags = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    let unsubscribe = null;
    const newTags = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
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
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newTags.push(doc.data());
          }
        });
      });
      dispatch(readTags(newTags));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { createTag, updateTag, deleteTag, readTag, readTags } =
  tag.actions;
export { fetchTag, fetchTags };
export default tag;
