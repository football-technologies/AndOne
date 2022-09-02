import { useSelector } from "react-redux";
import { useRouter } from "next/router";
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

const SideNavWithoutLogin = () => {
  const currentUser = useSelector((state) => state.account);
  const router = useRouter();
  const { logoutAuth } = useLogout();

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
      <HStack mb={"40px"}>
        <Image
          boxSize="150px"
          align={"center"}
          src="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"
        />
      </HStack>

      <HStack spacing={14}>
        <Box>
          {currentUser.name ? <Avatar name={currentUser.name} /> : <Avatar />}
        </Box>
        <Box>
          {currentUser.name ? (
            <Text>{currentUser.name}</Text>
          ) : (
            <Text>no name</Text>
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
                プロフィール編集をする
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
