import SideNavWithoutLogin from "./SideNavWithoutLogin";
import SideNavWithLogin from "./SideNavWithLogin";
import useAuthentication from "@/components/layouts/Authentication";

import { Image, Link } from "@chakra-ui/react";
import logo from "@/assets/logo/large.png";

const SideNavBasic = () => {
  const { currentUser } = useAuthentication();

  return (
    <>
      <Link href="/">
        <Image align={"center"} src="logo.png" p="5" />
      </Link>

      {currentUser.id ? (
        <SideNavWithLogin></SideNavWithLogin>
      ) : (
        <SideNavWithoutLogin></SideNavWithoutLogin>
      )}
    </>
  );
};

export default SideNavBasic;
