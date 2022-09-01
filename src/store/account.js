import { createSlice } from "@reduxjs/toolkit";

import { auth } from "@/plugins/firebase";
import { signOut } from "firebase/auth";

const account = createSlice({
  name: "account",
  initialState: {
    id: null,
    email: null,
    name: null,
  },
  reducers: {
    signup: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.name = payload.name;
    },
    login: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.name = payload.name;
    },
    logout: (state, { payload }) => {
      signOut(auth);
      state.id = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { signup, login, logout } = account.actions;
export default account;
