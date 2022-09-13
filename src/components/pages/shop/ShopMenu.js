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

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const ShopMenu = ({ shop }) => {
  const [isShopOwner, setIsShopOwner] = useState(false);
  const currentUser = useSelector((state) => state.account);

  useEffect(() => {
    if (currentUser.shopId === shop.id) {
      setIsShopOwner(true);
    }
  }, [currentUser.id]);

  return (
    <>
      {isShopOwner && (
        <Box pos="absolute" top="0" right="0" zIndex="10">
          <Menu arrowPadding="0" offset="0">
            <MenuButton className="ftHover" p="2">
              <Circle
                size="50px"
                bg="whiteAlpha.500"
                border="1px"
                borderColor="paleGray"
              >
                <Icon boxSize="1.8em" as={MdOutlineMoreVert}></Icon>
              </Circle>
            </MenuButton>
            <MenuList>
              <MenuItem m="0" p="0">
                <NextLink href={`/shops/${shop.id}/edit`} passHref>
                  <a className="ftBlock">
                    <Text fontSize="sm" p="5">
                      ショップを編集
                    </Text>
                  </a>
                </NextLink>
              </MenuItem>
              <MenuDivider />
              <MenuItem m="0" p="0">
                <NextLink href="/items/new" passHref>
                  <a className="ftBlock">
                    <Text fontSize="sm" p="5">
                      アイテムを追加
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

export default ShopMenu;
