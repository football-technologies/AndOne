import useFtToast from "@/components/ui/FtToast";
import { logout } from "@/store/account";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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
