import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { logout } from "@/store/account";
import { useToast } from "@chakra-ui/react";

const Logout = () => {
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
      <Button colorScheme="pink" onClick={onClick}>
        ログアウト
      </Button>
    </>
  );
};

export default Logout;
