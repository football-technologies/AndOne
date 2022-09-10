import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  getDocs,
  getDoc,
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

const fetchShop = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchShop");

    let unsubscribe = null;

    // query = `items/123`
    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readShop(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readShop(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchShops = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchShops");

    // const q = query(collection(db, "items"), where("status", "==", 1), orderBy("createdAt","desc"));

    let unsubscribe = null;
    const newShops = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
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
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newShops.push(doc.data());
          }
        });
      });
      dispatch(readShops(newShops));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { createShop, updateShop, readShop, readShops } = shop.actions;
export { fetchShop, fetchShops };
export default shop;
