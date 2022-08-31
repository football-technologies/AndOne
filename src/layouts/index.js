import SideNavBasic from "@/components/layouts/sidenav/SideNavBasic";
import { HStack, Stack } from "@chakra-ui/react";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HStack>
        <Stack w="30%" h="100vh" bgColor="white">
          <SideNavBasic></SideNavBasic>
        </Stack>
        <Stack w="70%" h="100vh" bgColor="gray.300">
          <main>{children}</main>
        </Stack>
      </HStack>
    </>
  );
};

export default DefaultLayout;
