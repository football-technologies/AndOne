import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { logout } from "@/store/account";

const SideNavWithLogin = () => {
  const dispatch = useDispatch();
  return (
    <>
      <main>SideNavWithLogin</main>

      <Button
        colorScheme="orange"
        onClick={() => {
          dispatch(logout());
        }}
      >
        ログアウト
      </Button>
    </>
  );
};

export default SideNavWithLogin;
