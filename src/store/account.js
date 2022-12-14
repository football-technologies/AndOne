import { auth } from "@/plugins/firebase";
import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { onSnapshot, getDocs } from "firebase/firestore";
import _ from "lodash";

const account = createSlice({
  name: "account",
  initialState: {
    id: null,
    authId: null,
    email: null,
    name: null,
    icon: null,
    shopId: null,
    shopItems: [],
    biddingItemIds: [],
    biddingItems: [],
  },
  reducers: {
    signup: (state, { payload }) => {
      state.id = payload.id;
      state.authId = payload.authId;
      state.email = payload.email;
      state.name = payload.name;
      state.icon = payload.icon;
      state.shopId = payload.shopId;
    },
    login: (state, { payload }) => {
      state.id = payload.id;
      state.authId = payload.authId;
      state.email = payload.email;
      state.name = payload.name;
      state.icon = payload.icon;
      state.shopId = payload.shopId;
    },
    logout: (state, { payload }) => {
      signOut(auth);
      state.id = null;
      state.authId = null;
      state.email = null;
      state.name = null;
      state.icon = null;
      state.shopId = null;
    },
    updateAccount: (state, { payload }) => {
      state.id = payload.id;
      state.authId = payload.authId;
      state.email = payload.email;
      state.name = payload.name;
      state.icon = payload.icon;
      state.shopId = payload.shopId;
    },

    readShopItems(state, { type, payload }) {
      state.shopItems = [...payload];
    },

    readBiddingItemIds(state, { type, payload }) {
      state.biddingItemIds = [...payload];
    },

    readBiddingItems(state, { type, payload }) {
      state.biddingItems = [...payload];
    },
  },
});

const fetchBiddingItemIds = ({
  type,
  query,
  isOnSnapshot = false,
  limit = 5,
}) => {
  return async (dispatch, getState) => {
    let unsubscribe = null;
    const newBiddingItemIds = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newBiddingItemIds.splice(
                  newIndex,
                  0,
                  change.doc.data().item.id
                );
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newBiddingItemIds.splice(
                  newIndex,
                  1,
                  change.doc.data().item.id
                );
              }
            }
          });
        }

        newBiddingItemIds = _.uniq(newBiddingItemIds);
        newBiddingItemIds = _.slice(newBiddingItemIds, 0, limit);

        dispatch(readBiddingItemIds(newBiddingItemIds));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newBiddingItemIds.push(doc.data());
          }
        });
      });
      dispatch(readBiddingItemIds(newBiddingItemIds));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchBiddingItems = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    let unsubscribe = null;
    const newBiddingItems = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newBiddingItems.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newBiddingItems.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readBiddingItems(newBiddingItems));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newBiddingItems.push(doc.data());
          }
        });
      });
      dispatch(readBiddingItems(newBiddingItems));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchShopItems = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
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
        dispatch(readShopItems(newItems));
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
      dispatch(readShopItems(newItems));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const {
  signup,
  login,
  logout,
  updateAccount,
  readBiddingItemIds,
  readBiddingItems,
  readShopItems,
} = account.actions;
export { fetchBiddingItems, fetchBiddingItemIds, fetchShopItems };

export default account;
