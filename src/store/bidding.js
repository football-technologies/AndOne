import { createSlice } from "@reduxjs/toolkit";

import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const bidding = createSlice({
  name: "bidding",
  initialState: {
    bidding: null,
    biddings: null,
  },
  reducers: {
    createBidding(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(
        doc(db, `items/${payload.item.id}/biddings/${payload.id}`),
        payload,
        {
          merge: true,
        }
      );
    },

    updateBidding(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(
        doc(db, `items/${payload.item.id}/biddings/${payload.id}`),
        payload,
        {
          merge: true,
        }
      );
    },

    deleteBidding(state, { type, payload }) {
      deleteDoc(doc(db, `items/${payload.item.id}/biddings/${payload.id}`));
    },

    readBidding(state, { type, payload }) {
      state.bidding = { ...payload };
    },

    readBiddings(state, { type, payload }) {
      state.biddings = [...payload];
    },
  },
});

const fetchBidding = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    // console.log(">>>>>>>>> called fetchBidding");

    let unsubscribe = null;

    // query = `items/432/biddings/123`
    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readBidding(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readBidding(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchBiddings = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    // console.log(">>>>>>>>> called fetchBiddings");

    // const q = query(collectionGroup(db, "biddings"), where("status", "==", 1), orderBy("createdAt","desc"));

    let unsubscribe = null;
    const newBiddings = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newBiddings.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newBiddings.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readBiddings(newBiddings));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newBiddings.push(doc.data());
          }
        });
      });
      dispatch(readBiddings(newBiddings));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const {
  createBidding,
  updateBidding,
  deleteBidding,
  readBidding,
  readBiddings,
} = bidding.actions;
export { fetchBidding, fetchBiddings };
export default bidding;
