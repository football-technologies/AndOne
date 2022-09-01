import { useDispatch } from "react-redux";
import { logout } from "@/store/account";
import { useToast } from "@chakra-ui/react";

const useLogout = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const logoutAuth = () => {
    dispatch(logout());
    toast({
      position: "top",
      title: "ログアウトしました",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return {
    logoutAuth,
  };
};

export default useLogout;