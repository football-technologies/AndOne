import { useDispatch } from "react-redux";
import { logout } from "@/store/account";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const useLogout = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const logoutAuth = () => {
    dispatch(logout());
    toast({
      position: "top",
      title: "ログアウトしました",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    router.push("/accounts/logout");
  };
  return {
    logoutAuth,
  };
};

export default useLogout;
