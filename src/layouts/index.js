import SideNavBase from "@/components/layouts/SideNav/Base";
import { HStack, Stack } from "@chakra-ui/react";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HStack align="start">
        <Stack w="30%" h="100vh" bg="gray.100">
          <SideNavBase></SideNavBase>
        </Stack>
        <Stack w="70%" h="100vh">
          <main>{children}</main>
        </Stack>
      </HStack>
    </>
  );
};
export default DefaultLayout;
