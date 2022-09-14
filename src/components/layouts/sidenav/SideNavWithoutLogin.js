import { FtMiddleButtonOutlined } from "@/components/ui/FtButton";
import {
  Box,
  Text,
  VStack,
  Stack,
  HStack,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const SideNavWithoutLogin = () => {
  const router = useRouter();

  const toLoginPage = () => {
    router.push("/accounts/login");
  };

  const toSignupPage = () => {
    router.push("/accounts/signup");
  };

  const items = [
    { id: 1, name: "AndOneとは？" },
    { id: 2, name: "運営会社" },
    { id: 3, name: "お問合せ" },
    { id: 4, name: "利用規約" },
    { id: 5, name: "プライバシーポリシー" },
  ];

  return (
    <Stack>
      <HStack>
        <Box>
          <Text mb="30px" fontSize="sm">
            We Love Football ⚽️<br></br>
            オークション形式で、懐かしのユニフォーム、限定ユニフォームが購入できるAnd
            Oneです。
          </Text>
        </Box>
      </HStack>

      <VStack align="stretch" spacing={5}>
        <Stack>
          <FtMiddleButtonOutlined
            display="block"
            colorScheme="pink"
            onClick={toSignupPage}
          >
            アカウントを作成する
          </FtMiddleButtonOutlined>
        </Stack>
        <Stack>
          <FtMiddleButtonOutlined colorScheme="pink" onClick={toLoginPage}>
            ログインする
          </FtMiddleButtonOutlined>
        </Stack>
      </VStack>

      <HStack>
        <List mt="50px" spacing={5}>
          {items.map((item) => (
            <ListItem key={item.id}>{item.name}</ListItem>
          ))}
        </List>
      </HStack>
    </Stack>
  );
};

export default SideNavWithoutLogin;
