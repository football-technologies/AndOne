import { useDispatch } from "react-redux";
import { logout } from "@/store/account";
import useFtToast from "@/components/ui/ftToast";
import { useRouter } from "next/router";

const useLogout = () => {
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();
  const router = useRouter();

  const logoutAuth = () => {
    dispatch(logout());
    ftToast("ログアウトしました");
    router.push("/accounts/logout");
  };
  return {
    logoutAuth,
  };
};

export default useLogout;
