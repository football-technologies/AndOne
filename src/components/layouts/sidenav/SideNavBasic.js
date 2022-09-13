import SideNavWithLogin from "./SideNavWithLogin";
import SideNavWithoutLogin from "./SideNavWithoutLogin";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSelector } from "react-redux";

const SideNavBasic = () => {
  const currentUser = useSelector((state) => state.account);

  return (
    <>
      <NextLink href="/" passHref>
        <a>
          <Image align="center" src="/logo.svg" p="5" />
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
