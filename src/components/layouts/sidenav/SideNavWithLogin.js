import useLogout from "../Logout";

import {
  Box,
  Text,
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
  MenuDivider,
} from "@chakra-ui/react";
import {
  MdOutlineCollections,
  MdOutlineAlarmOn,
  MdOutlineNotificationsNone,
  MdOutlineMoreVert,
} from "react-icons/md";
import { FaRegHourglass } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";

import ItemExtraSmallCard from "@/components/cards/ItemExtraSmallCard";
import NextLink from "next/link";

const SideNavWithoutLogin = () => {
  const currentUser = useSelector((state) => state.account);
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
      <HStack justify="space-between">
        {/* <Box> */}
        {currentUser.name ? (
          <Stack direction="row" align="center">
            <Avatar name={currentUser.name} />
            <Text w="130px" pl="2">
              {currentUser.name}fsfsdfsjfsdfjsdfsdfjs
            </Text>
          </Stack>
        ) : (
          <Stack direction="row" align="center">
            <Avatar src="https://s.hs-data.com/bilder/spieler/gross/150720.jpg?fallback=png" />
            <Text pl="2">User Name</Text>
          </Stack>
        )}

        <Box>
          <Menu>
            <MenuButton className="ftHover">
              <Icon as={MdOutlineMoreVert} w={6} h={6}></Icon>
            </MenuButton>
            <MenuList>
              <MenuItem p="5">
                <NextLink href="/" passHref>
                  <a>
                    <Text fontSize="sm">プロフィール編集をする</Text>
                  </a>
                </NextLink>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                p="5"
                onClick={() => {
                  logoutAuth();
                }}
              >
                <Text fontSize="sm">ログアウトする</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>

      <Divider />

      <Box py="10" px="3">
        <List spacing={5}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <NextLink href="/" passHref>
                <a>
                  <Text class="ftTextLink">
                    <ListIcon as={item.icon} mr="5" />
                    {item.name}
                  </Text>
                </a>
              </NextLink>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <Stack spacing="0">
        <Heading my={"10px"} size="sm">
          Bidding Items
        </Heading>
        {biddingItems.map((item) => (
          <ItemExtraSmallCard></ItemExtraSmallCard>
        ))}
      </Stack>
    </Stack>
  );
};

export default SideNavWithoutLogin;
