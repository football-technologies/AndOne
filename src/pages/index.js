import { db } from "@/plugins/firebase";
import { getDoc, doc } from "firebase/firestore";
import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "@/store/account";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@chakra-ui/react";

export default function Home() {
  const [dummy, setDummy] = useState();
  const currentUser = useSelector((state) => state.account);

  const dispatch = useDispatch();

  console.log(">>>>>>>>>> currentUser", currentUser);

  useEffect(() => {
    getDoc(doc(db, "dummy/PBx2t0p8lF6gO59WzQEw")).then((doc) => {
      if (doc.id) {
        console.log(">>>>>>> id", doc.data());
        setDummy(doc.data().name);
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(">>>>>>>>> login user", user);

        dispatch(
          login({
            id: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );
      } else {
        console.log(">>>>>>>>>> logout user");
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <Button>name: {dummy}</Button>;
}
