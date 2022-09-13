import account from "@/store/account";
import bidding from "@/store/bidding";
import comment from "@/store/comment";
import item from "@/store/item";
import like from "@/store/like";
import secret from "@/store/secret";
import shop from "@/store/shop";
import tag from "@/store/tag";
import user from "@/store/user";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import thunk from "redux-thunk";

const reducers = combineReducers({
  account: account.reducer,
  user: user.reducer,
  secret: secret.reducer,
  shop: shop.reducer,
  tag: tag.reducer,
  item: item.reducer,
  bidding: bidding.reducer,
  like: like.reducer,
  comment: comment.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
