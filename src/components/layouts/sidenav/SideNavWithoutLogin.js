import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SideNavWithoutLogin = () => {
  const router = useRouter();

  const toLoginPage = () => {
    router.push("/accounts/login");
  };

  const toSignupPage = () => {
    router.push("/accounts/signup");
  };

  return (
    <>
      <main>SideNavWithoutLogin</main>

      <Button colorScheme="orange" onClick={toLoginPage}>
        ログイン
      </Button>
      <Button colorScheme="orange" onClick={toSignupPage}>
        会員登録
      </Button>
    </>
  );
};

export default SideNavWithoutLogin;