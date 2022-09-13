import { useRouter } from "next/router";

const LogoutPage = () => {
  const router = useRouter();
  router.push("/");
  return;
};

export default LogoutPage;
