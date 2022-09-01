import SideNavWithoutLogin from "./SideNavWithoutLogin";
import SideNavWithLogin from "./SideNavWithLogin";

import useAuthentication from "@/components/layouts/Authentication";

import { Box } from "@chakra-ui/react";

const SideNavBasic = () => {
  const { currentUser } = useAuthentication();

  return (
    <Box w={"80%"} m={"20px auto"}>
      {currentUser.id ? (
        <SideNavWithLogin></SideNavWithLogin>
      ) : (
        <SideNavWithoutLogin></SideNavWithoutLogin>
      )}
    </Box>
  );
};

export default SideNavBasic;
