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

    readArtist(state, { type, payload }) {
      state.artist = { ...payload };
    },
  },
});

const fetchArtist = (payload) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchArtist");

    const unsubscribe = await onSnapshot(
      doc(db, payload.query),
      async (doc) => {
        if (doc.id) {
          dispatch(readArtist(doc.data()));
        }
      }
    );

    if (payload.type === "delete") {
      console.log(">>>>>>>>> called deleteArtist");
      unsubscribe();
    }
  };
};

export const { createArtist, readArtist } = artist.actions;
export { fetchArtist };
export default artist;
