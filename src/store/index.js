import { configureStore } from "@reduxjs/toolkit";

import account from "@/store/account";
import user from "@/store/user";
import secret from "@/store/secret";

export default configureStore({
  reducer: {
    account: account.reducer,
    user: user.reducer,
    secret: secret.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
