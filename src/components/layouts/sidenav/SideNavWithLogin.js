import useLogout from "../Logout";
import ItemExtraSmallCard from "@/components/cards/ItemExtraSmallCard";
import { db } from "@/plugins/firebase";
import {
  fetchBiddingItems,
  fetchBiddingItemIds,
  fetchShopItems,
} from "@/store/account";
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
  Badge,
  Circle,
} from "@chakra-ui/react";
import {
  query,
  collection,
  orderBy,
  where,
  collectionGroup,
} from "firebase/firestore";
import NextLink from "next/link";
import { useEffect } from "react";
import { FaRegImages } from "react-icons/fa";
import { FaRegHourglass } from "react-icons/fa";
import {
  MdOutlineCollections,
  MdOutlineAlarmOn,
  MdOutlineNotificationsNone,
  MdOutlineMoreVert,
  MdPhoto,
} from "react-icons/md";
import { RiHeartAddLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";

const SideNavWithoutLogin = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.account);
  const { logoutAuth } = useLogout();
  const bindBiddingItemIds = useSelector(
    (state) => state.account.biddingItemIds
  );
  const bindBiddingItems = useSelector((state) => state.account.biddingItems);
  const bindShopItems = useSelector((state) => state.account.shopItems);

  const links = [
    // {
    //   id: 1,
    //   name: "My Shop Items",
    //   url: `/shops/${currentUser.shopId}/items`,
    //   icon: MdOutlineCollections,
    // },
    {
      name: "Bidding Items",
      url: `/users/${currentUser.id}/biddings`,
      icon: FaRegHourglass,
    },
    {
      name: "Watch Items",
      url: `/users/${currentUser.id}/watches`,
      icon: MdOutlineAlarmOn,
    },
    {
      name: "Like Shops",
      url: `/users/${currentUser.id}/likes`,
      icon: RiHeartAddLine,
    },
    {
      name: "Notifications",
      url: `/users/${currentUser.id}/notifications`,
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

      dispatch(
        fetchShopItems({
          query: query(
            collection(db, "items"),
            where("shop.id", "==", currentUser.shopId)
          ),
          isOnSnapshot: true,
          type: "fetch",
        })
      );

      return () => {
        fetchBiddingItemIds({
          query: query(
            collectionGroup(db, "biddings"),
            where("user.id", "==", currentUser.id),
            orderBy("created", "desc")
          ),
          limit: 5,
          isOnSnapshot: true,
          type: "delete",
        });

        fetchShopItems({
          query: query(
            collection(db, "items"),
            where("shop.id", "==", currentUser.shopId)
          ),
          isOnSnapshot: true,
          type: "delete",
        });
      };
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

      return () => {
        dispatch(
          fetchBiddingItems({
            query: query(
              collection(db, "items"),
              where("id", "in", bindBiddingItemIds)
            ),
            isOnSnapshot: true,
            type: "delete",
          })
        );
      };
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
          {currentUser.shopId && (
            <ListItem>
              <NextLink href={`/shops/${currentUser.shopId}/items`} passHref>
                <a>
                  <Text className="ftTextLink">
                    <ListIcon as={FaRegImages} mr="5" />
                    My Shop Items
                    <Text
                      bg="primary"
                      rounded="full"
                      px="1.5"
                      ml="2"
                      color="white"
                      fontSize="xs"
                      display="inline-block"
                    >
                      {bindShopItems?.length}
                    </Text>
                  </Text>
                </a>
              </NextLink>
            </ListItem>
          )}

          {links.map((link) => (
            <ListItem key={link.name}>
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
