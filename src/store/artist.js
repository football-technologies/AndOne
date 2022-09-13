import { db } from "@/plugins/firebase";
import { createSlice } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  getDocs,
  getDoc,
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

const fetchArtist = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchArtist");

    let unsubscribe = null;

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readArtist(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readArtist(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchArtists = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    console.log(">>>>>>>>> called fetchArtists");

    let unsubscribe = null;
    const newArtists = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newArtists.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newArtists.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readArtists(newArtists));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newArtists.push(doc.data());
          }
        });
      });
      dispatch(readArtists(newArtists));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const { createArtist, readArtist } = artist.actions;
export { fetchArtist, fetchArtists };
export default artist;
