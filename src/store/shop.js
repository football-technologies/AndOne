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
  // return async (dispatch, getState) => {
  //   console.log(">>>>>>>>> called fetchUser");

  //   const unsubscribe = await onSnapshot(
  //     doc(db, "users", payload.query),
  //     async (doc) => {
  //       if (doc.id) {
  //         dispatch(readUser(doc.data()));
  //       }
  //     }
  //   );

  //   if (payload.type === "delete") {
  //     unsubscribe();
  //   }
  // };
};

export const { createShop, updateShop } = shop.actions;
export { fetchShop };
export default shop;
