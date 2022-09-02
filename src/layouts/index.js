import SideNavBasic from "@/components/layouts/sidenav/SideNavBasic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "@/store/account";
import { getDocs, where, collection, query } from "firebase/firestore";
import { db } from "@/plugins/firebase";

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(">>>>>>>>> login user", user.uid);

        const q = query(
          collection(db, "users"),
          where("authId", "==", user.uid)
        );

        await getDocs(q).then((snapshot) => {
          snapshot.forEach(async (doc) => {
            if (doc.id) {
              dispatch(
                login({
                  id: doc.data().id,
                  authId: user.uid,
                  email: doc.data().email,
                  name: doc.data().displayName,
                  icon: doc.data().icon,
                })
              );
            }
          });
        });
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
        <main id="ftMainContainer">{children}</main>
      </article>
    </>
  );
};

export default DefaultLayout;
