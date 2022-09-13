import { db } from "@/plugins/firebase";
import { createSlice } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const comment = createSlice({
  name: "comment",
  initialState: {
    comment: null,
    comments: null,
  },
  reducers: {
    createComment(state, { type, payload }) {
      payload["createdAt"] = serverTimestamp();
      setDoc(
        doc(db, `items/${payload.item.id}/comments/${payload.id}`),
        payload,
        { merge: true }
      );
    },

    updateComment(state, { type, payload }) {
      payload["updatedAt"] = serverTimestamp();
      setDoc(
        doc(db, `items/${payload.item.id}/comments/${payload.id}`),
        payload,
        { merge: true }
      );
    },

    deleteComment(state, { type, payload }) {
      deleteDoc(doc(db, `items/${payload.item.id}/comments/${payload.id}`));
    },

    readComment(state, { type, payload }) {
      state.comment = { ...payload };
    },

    readComments(state, { type, payload }) {
      state.comments = [...payload];
    },
  },
});

const fetchComment = ({ query, type, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    let unsubscribe = null;

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(doc(db, query), async (doc) => {
        if (doc.id) {
          dispatch(readComment(doc.data()));
        }
      });
    }

    if (!isOnSnapshot) {
      await getDoc(doc(db, query)).then((doc) => {
        if (doc.id) {
          dispatch(readComment(doc.data()));
        }
      });
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

const fetchComments = ({ type, query, isOnSnapshot = false }) => {
  return async (dispatch, getState) => {
    let unsubscribe = null;
    const newComments = [];

    if (isOnSnapshot) {
      unsubscribe = await onSnapshot(query, async (snapshot) => {
        if (snapshot) {
          await snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newComments.splice(newIndex, 0, change.doc.data());
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().id) {
                const newIndex = change.newIndex;
                newComments.splice(newIndex, 1, change.doc.data());
              }
            }
          });
        }
        dispatch(readComments(newComments));
      });
    }

    if (!isOnSnapshot) {
      await getDocs(query).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            newComments.push(doc.data());
          }
        });
      });
      dispatch(readComments(newComments));
    }

    if (type === "delete") {
      unsubscribe();
    }
  };
};

export const {
  createComment,
  updateComment,
  deleteComment,
  readComment,
  readComments,
} = comment.actions;
export { fetchComment, fetchComments };
export default comment;
