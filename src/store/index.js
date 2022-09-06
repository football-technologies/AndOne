import { configureStore } from "@reduxjs/toolkit";

import account from "@/store/account";
import user from "@/store/user";
import secret from "@/store/secret";
import shop from "@/store/shop";
import tag from "@/store/tag";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  account: account.reducer,
  user: user.reducer,
  secret: secret.reducer,
  shop: shop.reducer,
  tag: tag.reducer,
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

// export default configureStore({
//   reducer: {
//     account: account.reducer,
//     user: user.reducer,
//     secret: secret.reducer,
//     shop: shop.reducer,
//     tag: tag.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
