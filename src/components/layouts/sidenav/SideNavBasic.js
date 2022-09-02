import SideNavWithoutLogin from "./SideNavWithoutLogin";
import SideNavWithLogin from "./SideNavWithLogin";
import { useSelector } from "react-redux";

import { Image, Link } from "@chakra-ui/react";
import logo from "@/assets/logo/large.png";

const SideNavBasic = () => {
  const currentUser = useSelector((state) => state.account);
  console.log(">>>>>>>> currentUser:", currentUser);

  return (
    <>
      <Link href="/">
        <Image align={"center"} src="logo.png" p="5" />
      </Link>

      {currentUser ? (
        <SideNavWithLogin></SideNavWithLogin>
      ) : (
        <SideNavWithoutLogin></SideNavWithoutLogin>
      )}
    </>
  );
};

export default SideNavBasic;
