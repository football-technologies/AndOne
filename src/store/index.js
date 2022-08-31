import { configureStore } from "@reduxjs/toolkit";

import account from "@/store/account";
import user from "@/store/user";

export default configureStore({
  reducer: {
    account: account.reducer,
    user: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
