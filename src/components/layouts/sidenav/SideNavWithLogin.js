import { useRouter } from "next/router";
import useAuthentication from "../Authentication";
import useLogout from "../Logout";

import {
  Box,
  Text,
  Image,
  List,
  ListItem,
  ListIcon,
  Avatar,
  HStack,
  Stack,
  Icon,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MdOutlineCollections,
  MdOutlineAlarmOn,
  MdOutlineNotificationsNone,
  MdOutlineMoreVert,
} from "react-icons/md";
import { FaRegHourglass } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import UserIcon from "@/components/ui/UserIcon";

const SideNavWithoutLogin = () => {
  const { currentUser } = useAuthentication();
  const { logoutAuth } = useLogout();
  const router = useRouter();

  const items = [
    { id: 1, name: "My Collections", icon: MdOutlineCollections },
    { id: 2, name: "Bidding Items", icon: FaRegHourglass },
    { id: 3, name: "Watch Items", icon: MdOutlineAlarmOn },
    { id: 4, name: "Likes", icon: RiHeartAddLine },
    { id: 5, name: "Notifications", icon: MdOutlineNotificationsNone },
  ];

  const biddingItems = [
    {
      id: 1,
      price: "15,000円",
      url: "https://www.sskamo.co.jp/puma/club/img/manc22-23-3rd-765734-03-min.jpg",
      name: "22-23 MANCHESTER CITY AUTHENTIC UNIFORMHOME",
    },
    {
      id: 2,
      price: "15,000円",
      url: "https://www.sskamo.co.jp/puma/club/img/manc22-23-3rd-765734-03-min.jpg",
      name: "22-23 MANCHESTER CITY AUTHENTIC UNIFORMHOME",
    },
    {
      id: 3,
      price: "15,000円",
      url: "https://www.sskamo.co.jp/puma/club/img/manc22-23-3rd-765734-03-min.jpg",
      name: "22-23 MANCHESTER CITY AUTHENTIC UNIFORMHOME",
    },
  ];

  return (
    <Stack>
      <HStack spacing={14}>
        <Box>
          {currentUser.iconUrl ? (
            <UserIcon url={currentUser.iconUrl} size="md" />
          ) : (
            <UserIcon name={currentUser.name} size="md" />
          )}
        </Box>
        <Box>
          {currentUser.name ? (
            <Text>{currentUser.name}</Text>
          ) : (
            <Text>User Name</Text>
          )}
        </Box>
        <Box>
          <Menu>
            <MenuButton>
              <Icon as={MdOutlineMoreVert} w={6} h={6}></Icon>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  router.push(`/users/${currentUser.id}/edit`);
                }}
              >
                プロフィール編集する
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutAuth();
                }}
              >
                ログアウトする
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>

      <Divider />
      <HStack py={"30px"}>
        <List spacing={5}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Text>
                <ListIcon as={item.icon} />
                {item.name}
              </Text>
            </ListItem>
          ))}
        </List>
      </HStack>
      <Divider />

      <Stack>
        <Heading my={"10px"} size="sm">
          Bidding Items
        </Heading>
        {biddingItems.map((item) => (
          <HStack key={item.id}>
            <Box w={"50%"}>
              <Image borderRadius="lg" boxSize="100px" src={item.url} />
            </Box>
            <Box w={"50%"}>
              <Text>{item.price}</Text>
              <Text>{item.name}</Text>
            </Box>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SideNavWithoutLogin;
