import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Circle,
  Icon,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { MdOutlineMoreVert } from "react-icons/md";

import { updateItem } from "@/store/item";
import { useDispatch } from "react-redux";
import useFtToast from "@/components/ui/FtToast";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const ItemMenu = ({ item }) => {
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();

  const [isShopOwner, setIsShopOwner] = useState(false);
  const currentUser = useSelector((state) => state.account);

  useEffect(() => {
    if (currentUser.shopId === item.shop.id) {
      setIsShopOwner(true);
    }
  }, [currentUser.id]);

  const openItem = () => {
    dispatch(
      updateItem({
        id: item.id,
        itemStatus: 2,
      })
    );
    ftToast("itemを公開しました 🎉");
  };

  const closeItem = () => {
    dispatch(
      updateItem({
        id: item.id,
        itemStatus: 1,
      })
    );
    ftToast("itemを下書き状態にしました");
  };

  return (
    <>
      {isShopOwner && (
        <Box pos="absolute" top="0" right="0" zIndex="10">
          <Menu arrowPadding="0" offset="0">
            <MenuButton className="ftHoverBg" p="2">
              <Circle>
                <Icon boxSize="1.8em" as={MdOutlineMoreVert}></Icon>
              </Circle>
            </MenuButton>
            <MenuList>
              <MenuItem m="0" p="0">
                <NextLink href={`/items/${item.id}/edit`} passHref>
                  <a className="ftBlock">
                    <Text fontSize="sm" p="5">
                      アイテム情報を編集
                    </Text>
                  </a>
                </NextLink>
              </MenuItem>
              <MenuDivider />

              <MenuItem m="0" p="0">
                {item.itemStatus === 1 && (
                  <Box onClick={() => openItem()}>
                    <Text fontSize="sm" p="5">
                      アイテムを公開
                    </Text>
                  </Box>
                )}
                {item.itemStatus >= 2 && (
                  <Box onClick={() => closeItem()}>
                    <Text fontSize="sm" p="5">
                      アイテムを下書きに設定
                    </Text>
                  </Box>
                )}
              </MenuItem>

              <MenuDivider />
              <MenuItem m="0" p="0">
                <NextLink href={`/items/${item.id}/settings`} passHref>
                  <a className="ftBlock">
                    <Text fontSize="sm" p="5">
                      アイテムの入札設定
                    </Text>
                  </a>
                </NextLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default ItemMenu;
