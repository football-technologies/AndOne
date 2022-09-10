import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import useLogout from "../Logout";
import { fetchUser } from "@/store/user";
import { fetchSecret } from "@/store/secret";

import { useEffect } from "react";
import { fetchBiddingItems, fetchBiddingItemIds } from "@/store/account";
import { db } from "@/plugins/firebase";
import {
  query,
  collection,
  orderBy,
  where,
  collectionGroup,
} from "firebase/firestore";

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
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.account);
  const { logoutAuth } = useLogout();
  const bindBiddingItemIds = useSelector(
    (state) => state.account.biddingItemIds
  );
  const bindBiddingItems = useSelector((state) => state.account.biddingItems);

  const links = [
    { id: 1, name: "My Collections", url: "/", icon: MdOutlineCollections },
    { id: 2, name: "Bidding Items", url: "/", icon: FaRegHourglass },
    {
      id: 3,
      name: "Watch Items",
      url: `/users/${currentUser.id}/watches`,
      icon: MdOutlineAlarmOn,
    },
    {
      id: 4,
      name: "Likes",
      url: `/users/${currentUser.id}/likes`,
      icon: RiHeartAddLine,
    },
    {
      id: 5,
      name: "Notifications",
      url: "/",
      icon: MdOutlineNotificationsNone,
    },
  ];

  useEffect(() => {
    if (currentUser.id) {
      dispatch(
        fetchBiddingItemIds({
          query: query(
            collectionGroup(db, "biddings"),
            where("user.id", "==", currentUser.id),
            orderBy("created", "desc")
            // where("status", "==", 1)
          ),
          limit: 5,
          isOnSnapshot: true,
          type: "fetch",
        })
      );
    }
  }, []);

  useEffect(() => {
    if (bindBiddingItemIds && bindBiddingItemIds.length > 0) {
      dispatch(
        fetchBiddingItems({
          query: query(
            collection(db, "items"),
            where("id", "in", bindBiddingItemIds)
          ),
          isOnSnapshot: true,
          type: "fetch",
        })
      );
    }
  }, [bindBiddingItemIds]);

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
          {links.map((link) => (
            <ListItem key={link.id}>
              <NextLink href={link.url} passHref>
                <a>
                  <Text className="ftTextLink">
                    <ListIcon as={link.icon} mr="5" />
                    {link.name}
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
        {bindBiddingItems &&
          bindBiddingItems.map((item) => (
            <ItemExtraSmallCard item={item} key={item.id}></ItemExtraSmallCard>
          ))}
      </Stack>
    </Stack>
  );
};

export default SideNavWithoutLogin;
