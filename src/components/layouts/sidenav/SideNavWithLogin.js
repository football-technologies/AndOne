import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { logout } from "@/store/account";
import { useToast } from "@chakra-ui/react";

const SideNavWithLogin = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const onClick = () => {
    dispatch(logout());
    toast({
      position: "top",
      title: "ログアウトしました",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <>
      <main>SideNavWithLogin</main>

      <Button colorScheme="orange" onClick={onClick}>
        ログアウト
      </Button>
    </>
  );
};

export default SideNavWithLogin;
