import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const item = createSlice({
  name: "item",
  initialState: {
    item: null,
    items: null,
  },
  reducers: {
    createItem(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `items/${payload.id}`), payload, { merge: true });
    },

    updateItem(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(doc(db, `items/${payload.id}`), payload, { merge: true });
    },

    readItem(state, { type, payload }) {
      state.item = { ...payload };
    },

    readItems(state, { type, payload }) {
      state.items = [...payload];
    },
  },
});

const fetchItem = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchItem");

    let unsubscribe = null;

    // query = `items/123`
    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readItem(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readItem(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchItems = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchItems");

    // const q = query(collection(db, "items"), where("status", "==", 1), orderBy("createdAt","desc"));

    let unsubscribe = null;
    const newItems = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newItems.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newItems.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readItems(newItems));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newItems.push(doc.data());
          }
        });
      });
      dispatch(readItems(newItems));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { createItem, updateItem, readItem, readItems } = item.actions;
export { fetchItem, fetchItems };
export default item;
