import SideNavBasic from "@/components/layouts/sidenav/SideNavBasic";
import FtSearchBox from "@/components/ui/FtSearchBox";
import { auth } from "@/plugins/firebase";
import { db } from "@/plugins/firebase";
import { login, logout } from "@/store/account";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDocs,
  where,
  collection,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log(">>>>>>>>> login user");

        const q = query(
          collection(db, "users"),
          where("authId", "==", authUser.uid)
        );

        const user = null;
        await getDocs(q).then((snapshot) => {
          snapshot.forEach(async (doc) => {
            if (doc.id) {
              user = doc.data();
            }
          });
        });

        const secret = null;
        if (user) {
          await getDoc(doc(db, `users/${user.id}/secrets`, user.id)).then(
            async (doc) => {
              if (doc.id) {
                secret = doc.data();
              }
            }
          );
        }

        if (secret) {
          dispatch(
            login({
              id: user.id,
              authId: user.authId,
              email: secret.email,
              name: user.displayName,
              icon: user.icon,
              shopId: user.shop.id,
            })
          );
        }
      } else {
        console.log(">>>>>>>>>> logout user");
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <>
      <header id="ftHeader">
        <SideNavBasic></SideNavBasic>
      </header>

      <article id="ftMain">
        <FtSearchBox></FtSearchBox>
        <main id="ftMainContainer">{children}</main>
      </article>
    </>
  );
};

export default DefaultLayout;
