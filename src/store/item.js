import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  query,
  collection,
  orderBy,
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

const fetchItem = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchItem");

    const unsubscribe = await onSnapshot(
      doc(db, payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readItem(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      console.log(">>>>>>>>> called deleteItem");
      unsubscribe();
    }
  };
};

const fetchItems = (payload) => {
  return async (dispatch, getState) => {
    const newItems = [];
    // const q = query(
    //   collection(db, payload.query),
    //   orderBy("createdAt", "desc")
    // );

    const q = payload.query;

    const unsubscribe = await onSnapshot(q, async (snapshot) => {
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

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const { createItem, updateItem, readItem, readItems } = item.actions;
export { fetchItem, fetchItems };
export default item;
