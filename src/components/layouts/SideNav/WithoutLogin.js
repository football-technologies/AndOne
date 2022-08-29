import { Button } from "@chakra-ui/react";

const WithoutLogin = () => {
  const login = () => {
    // toursのように、modal画面で実現したい
  };

  const signup = () => {
    // toursのように、modal画面で実現したい
  };

  return (
    <>
      <h1>withoutLogin</h1>

      <Button colorScheme="orange" onClick={signup}>
        アカウント作成
      </Button>
      <Button colorScheme="orange" onClick={login}>
        ログイン
      </Button>
    </>
  );
};

export default WithoutLogin;
