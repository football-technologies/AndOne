import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "@/store/account";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useAuthentication = () => {
  const currentUser = useSelector((state) => state.account);

  const dispatch = useDispatch();

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

  return {
    currentUser,
  };
};

export default useAuthentication;
