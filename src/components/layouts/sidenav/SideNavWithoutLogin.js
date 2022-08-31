import { useRouter } from "next/router";
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  Stack,
  HStack,
  List,
  ListItem,
} from "@chakra-ui/react";

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
        <Image
          boxSize="150px"
          align={"center"}
          src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"
        />
      </HStack>

      <HStack>
        <Box>
          <Text my={"30px"}>好きなものに囲まれて生活する</Text>

          <Text mb={"30px"}>
            オークション形式で、お気に入りのアイテムを購入して、日常の生活に+1してみませんか。
          </Text>
        </Box>
      </HStack>

      <VStack align={"stretch"} spacing={5}>
        <Stack>
          <Button display={"block"} colorScheme="pink" onClick={toSignupPage}>
            アカウント作成をする
          </Button>
        </Stack>
        <Stack>
          <Button colorScheme="pink" onClick={toLoginPage}>
            ログインする
          </Button>
        </Stack>
      </VStack>

      <HStack>
        <List mt={"50px"} spacing={5}>
          {items.map((item) => (
            <ListItem key={item.id}>{item.name}</ListItem>
          ))}
        </List>
      </HStack>
    </Stack>
  );
};

export default SideNavWithoutLogin;
