import { createSlice } from "@reduxjs/toolkit";

import { auth } from "@/plugins/firebase";
import { signOut } from "firebase/auth";

const account = createSlice({
  name: "account",
  initialState: {
    id: null,
    authId: null,
    email: null,
    name: null,
    icon: null,
  },
  reducers: {
    signup: (state, { payload }) => {
      state.id = payload.id;
      state.authId = payload.authId;
      state.email = payload.email;
      state.name = payload.name;
      state.icon = payload.icon;
    },
    login: (state, { payload }) => {
      state.id = payload.id;
      state.authId = payload.authId;
      state.email = payload.email;
      state.name = payload.name;
      state.icon = payload.icon;
    },
    logout: (state, { payload }) => {
      signOut(auth);
      state.id = null;
      state.authId = null;
      state.email = null;
      state.name = null;
      state.icon = null;
    },
  },
});

export const { signup, login, logout } = account.actions;
export default account;
