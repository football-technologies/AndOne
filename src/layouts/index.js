import SideNavBasic from "@/components/layouts/sidenav/SideNavBasic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "@/store/account";

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(">>>>>>>>> login user", user);

        await user.reload();

        // const userToken = await user.getIdTokenResult(true);
        // const claims = userToken.claims;

        dispatch(
          login({
            // id: claims.userId,
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
