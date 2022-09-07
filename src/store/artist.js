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

const artist = createSlice({
  name: "artist",
  initialState: {
    artist: null,
    artists: null,
  },
  reducers: {
    createArtist(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(doc(db, `artists/${payload.id}`), payload, { merge: true });
    },
  },
});

export const { createArtist } = artist.actions;
export default artist;
