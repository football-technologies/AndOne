import SideNavBasic from "@/components/layouts/sidenav/SideNavBasic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "@/store/account";
import { getDocs, where, collection, query } from "firebase/firestore";
import { db } from "@/plugins/firebase";

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(">>>>>>>>> login user", user);

        // await user.reload();

        // const userToken = await user.getIdTokenResult(true);
        // const claims = userToken.claims;

        const q = query(
          collection(db, "users"),
          where("authId", "==", user.uid)
        );

        const fetchUser = await getDocs(q).then((snapshot) => {
          snapshot.forEach(async (doc) => {
            if (doc.id) {
              return doc.data();
            }
          });
        });

        dispatch(
          login({
            id: fetchUser.id,
            authId: user.uid,
            email: user.email,
            name: user.displayName,
            icon: fetchUser.icon,
          })
        );
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
