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

    readShops(state, { type, payload }) {
      state.shops = [...payload];
    },
  },
});

const fetchShop = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchShop", payload);

    const unsubscribe = await onSnapshot(
      doc(db, payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readShop(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      console.log(">>>>>>>>> called deleteShop");
      unsubscribe();
    }
  };
};

const fetchShops = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchShops");

    const newShops = [];
    const q = query(
      collection(db, payload.query),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = await onSnapshot(q, async (snapshot) => {
      if (snapshot) {
        await snapshot.docChanges().forEach(async (change) => {
          // console.log(
          //   ">>>>>>>>>>>> change.type",
          //   change.type,
          //   change.newIndex,
          //   change.doc.data()
          // );

          if (change.type === "added") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newShops.splice(newIndex, 0, change.doc.data());
            }
          }

          if (change.type === "modified") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              newShops.splice(newIndex, 1, change.doc.data());
            }
          }
        });
      }

      dispatch(readShops(newShops));
    });

    if (payload.type === "delete") {
      unsubscribe();
    }
  };
};

export const { createShop, updateShop, readShop, readShops } = shop.actions;
export { fetchShop, fetchShops };
export default shop;
