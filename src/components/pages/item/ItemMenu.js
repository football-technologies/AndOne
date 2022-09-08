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

const ItemMenu = ({ itemId }) => {
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();

  const openItem = () => {
    dispatch(
      updateItem({
        id: itemId,
        itemStatus: 2,
      })
    );
    ftToast("itemを公開しました 🎉");
  };

  return (
    <>
      <Box pos="absolute" top="0" right="0" zIndex="10">
        <Menu arrowPadding="0" offset="0">
          <MenuButton className="ftHoverBg" p="2">
            <Circle>
              <Icon boxSize="1.8em" as={MdOutlineMoreVert}></Icon>
            </Circle>
          </MenuButton>
          <MenuList>
            <MenuItem m="0" p="0">
              <NextLink href={`/items/${itemId}/edit`} passHref>
                <a className="ftBlock">
                  <Text fontSize="sm" p="5">
                    アイテムを編集
                  </Text>
                </a>
              </NextLink>
            </MenuItem>
            <MenuDivider />
            <MenuItem m="0" p="0">
              <Box onClick={() => openItem()}>
                <Text fontSize="sm" p="5">
                  アイテムを公開
                </Text>
              </Box>
            </MenuItem>

            <MenuDivider />
            <MenuItem m="0" p="0">
              <NextLink href="/items/new" passHref>
                <a className="ftBlock">
                  <Text fontSize="sm" p="5">
                    アイテムの販売開始
                  </Text>
                </a>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default ItemMenu;
