import SideNavWithoutLogin from "./SideNavWithoutLogin";
import SideNavWithLogin from "./SideNavWithLogin";
import { useSelector } from "react-redux";

import { Image } from "@chakra-ui/react";
import NextLink from "next/link";

const SideNavBasic = () => {
  const currentUser = useSelector((state) => state.account);
  console.log(">>>>>>>> currentUser:", currentUser);

  return (
    <>
      <NextLink href="/" passHref>
        <a>
          <Image align={"center"} src="/logo.png" p="5" />
        </a>
      </NextLink>

      {currentUser.id ? (
        <SideNavWithLogin></SideNavWithLogin>
      ) : (
        <SideNavWithoutLogin></SideNavWithoutLogin>
      )}
    </>
  );
};

export default SideNavBasic;
