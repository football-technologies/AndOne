import { useSelector } from "react-redux";
import { useRouter, useDispatch } from "next/router";
import useLogout from "../Logout";
import { fetchUser } from "@/store/user";
import { fetchSecret } from "@/store/secret";

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
  Button,
} from "@chakra-ui/react";
import {
  MdOutlineCollections,
  MdOutlineAlarmOn,
  MdOutlineNotificationsNone,
  MdOutlineMoreVert,
} from "react-icons/md";
import { FaRegHourglass } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";

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
        <Stack direction="row" align="center">
          {currentUser.icon ? (
            <Avatar src={currentUser.icon}></Avatar>
          ) : (
            <Avatar name={currentUser.name}></Avatar>
          )}
          <Text w="130px" pl="2">
            {currentUser.name}
          </Text>
        </Stack>

        <Box>
          <Menu arrowPadding="0" offset="0">
            <MenuButton className="ftHover">
              <Icon as={MdOutlineMoreVert} w={6} h={6}></Icon>
            </MenuButton>
            <MenuList>
              <MenuItem m="0" p="0">
                <NextLink
                  href={
                    currentUser.shopId
                      ? `/shops/${currentUser.shopId}`
                      : `/shops/new`
                  }
                  passHref
                >
                  <a className="ftBlock">
                    <Text fontSize="sm" p="5">
                      {currentUser.shopId
                        ? "shopページを確認"
                        : "shopページを作成"}
                    </Text>
                  </a>
                </NextLink>
              </MenuItem>
              <MenuDivider m="0" p="0" />

              <MenuItem m="0" p="0">
                <NextLink href={`/users/${currentUser.id}/edit`} passHref>
                  <a className="ftBlock">
                    <Text fontSize="sm" p="5">
                      プロフィール編集
                    </Text>
                  </a>
                </NextLink>
              </MenuItem>
              <MenuDivider m="0" p="0" />
              <MenuItem
                p="0"
                m="0"
                onClick={() => {
                  logoutAuth();
                }}
              >
                <Text
                  p="5"
                  fontSize="sm"
                  style={{ display: "block", width: "100%" }}
                >
                  ログアウトする
                </Text>
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
                  <Text className="ftTextLink">
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
          <ItemExtraSmallCard key={item.id}></ItemExtraSmallCard>
        ))}
      </Stack>
    </Stack>
  );
};

export default SideNavWithoutLogin;
