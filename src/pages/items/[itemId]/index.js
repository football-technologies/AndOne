import { useRouter } from "next/router";
import { useRef } from "react";
import DialogPostBidding from "@/components/dialog/DialogPostBidding";

import { FtMiddleButton } from "@/components/ui/FtButton";

import {
  Box,
  HStack,
  Stack,
  Image,
  AspectRatio,
  Heading,
  Text,
  Button,
  Center,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItem } from "@/store/item";
import DialogImage from "@/components/pages/shop/DialogImage";

import ItemMenu from "@/components/pages/item/ItemMenu";
import LikeButton from "@/components/ui/LikeButton";

import DisplayItemStatus from "@/components/pages/item/DisplayItemStatus";

const ItemShow = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { itemId } = router.query;
  const bindItem = useSelector((state) => state.item.item);
  const dialogPostBidding = useRef(null);
  const dialogImage = useRef();

  // const itemStatus = _.find(dictionary.itemStatus, (row) => {
  //   if (row.id === bindItem.itemStatus) {
  //     return row;
  //   }
  // });

  console.log(">>>>>>>> bindItem", bindItem);

  const openDialogImage = (index) => {
    dialogImage.current.openDialog({
      images: bindItem.images,
      index: index,
    });
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        fetchItem({
          query: `items/${itemId}`,
          type: "fetch",
        })
      );
    }
  }, [router.isReady]);

  const openDialogBidding = () => {
    dialogPostBidding.current.openDialog();
  };

  return (
    <>
      {bindItem && (
        <>
          <HStack align="start" position="relative">
            <Box position="absolute" top="-30px" right="0" zIndex="2">
              <DisplayItemStatus
                itemStatus={bindItem.itemStatus}
              ></DisplayItemStatus>
            </Box>

            <Stack width="70%">
              <Stack direction="row">
                <Box width="100px">
                  {bindItem.images.map((image, index) => {
                    return (
                      <Box key={index} pb="2">
                        <AspectRatio ratio={1}>
                          <Image
                            src={image.url}
                            className="ftHover"
                            onClick={() => openDialogImage(index)}
                          ></Image>
                        </AspectRatio>
                      </Box>
                    );
                  })}
                </Box>

                <Box>
                  <Image src={bindItem.images[0].url}></Image>
                  <Text fontSize="xs" pt="2">
                    caption: ああああああ
                  </Text>
                </Box>
              </Stack>
            </Stack>

            <Box width="30%" p="5" position="relative">
              <ItemMenu
                itemId={bindItem.id}
                itemStatus={bindItem.itemStatus}
              ></ItemMenu>

              <Heading as="h1" fontSize="md">
                {bindItem.name}
              </Heading>

              <LikeButton
                target="item"
                id={bindItem.id}
                name={bindItem.name}
              ></LikeButton>

              <Stack
                direction="row"
                borderBottom="2px"
                borderColor="primary"
                align="end"
                pt="10"
              >
                <Text fontSize="md" fontWeight="bold" color="primary">
                  7,800円
                </Text>
                <Spacer></Spacer>
                <Text fontWeight={700} fontSize="xs">
                  残り 23時間42分
                </Text>
              </Stack>

              <Center pt="2">
                <FtMiddleButton onClick={openDialogBidding}>
                  入札する
                </FtMiddleButton>
              </Center>

              {bindItem.createdYear && (
                <Box pt="10">
                  <Text
                    display="inline"
                    fontSize="xs"
                    p="1"
                    border="1px"
                    borderColor="lightGray"
                  >
                    作成年：{bindItem.createdYear}
                  </Text>
                </Box>
              )}

              <Box pt={5}>
                {bindItem.tags.map((tag) => {
                  return (
                    <NextLink href={`/tags/${tag.id}`} passHref key={tag.id}>
                      <Button size="xs" variant="link" as="a" pr="2">
                        #{tag.name}
                      </Button>
                    </NextLink>
                  );
                })}
              </Box>

              <Box pt="5">
                <NextLink href={`/shops/${bindItem.shop.id}`} passHref>
                  <a>
                    <Stack
                      direction="row"
                      align="center"
                      bg="paleGray"
                      p="2"
                      className="ftHover"
                    >
                      <Box width="50px">
                        <AspectRatio ratio={1}>
                          <Image
                            src={bindItem.shop.icon}
                            borderRadius="5px"
                          ></Image>
                        </AspectRatio>
                      </Box>
                      <Box>
                        <Text fontSize="xs">販売ショップ</Text>
                        <Text
                          fontWeight="700"
                          fontSize="xs"
                          maxHeight="2.8em"
                          overflow="hidden"
                        >
                          {bindItem.shop.name}
                        </Text>
                      </Box>
                    </Stack>
                  </a>
                </NextLink>
              </Box>
            </Box>
          </HStack>

          <Box width="600px" mx="auto" p="10">
            <Text fontSize="sm">{bindItem.description}</Text>
          </Box>
          {/* dialog */}
          <DialogPostBidding ref={dialogPostBidding}></DialogPostBidding>

          <DialogImage ref={dialogImage}></DialogImage>
        </>
      )}
    </>
  );
};

export default ItemShow;
