import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import { doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const shop = createSlice({
  name: "shop",
  initialState: {
    shop: null,
    shops: null,
  },
  reducers: {
    createShop(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `shops/${payload.id}`), payload, { merge: true });
    },

    updateShop(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(doc(db, `shops/${payload.id}`), payload, { merge: true });
    },

    readShop(state, { type, payload }) {
      state.shop = { ...payload };
    },
  },
});

const fetchShop = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchShop");

    const unsubscribe = await onSnapshot(
      doc(db, "shops", payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readShop(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      console.log(">>>>>>>>> delete fetchShop");
      unsubscribe();
    }
  };
};

export const { createShop, updateShop, readShop } = shop.actions;
export { fetchShop };
export default shop;
