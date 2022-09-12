import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import DialogPostBidding from "@/components/dialog/DialogPostBidding";
import ItemComments from "@/components/pages/item/ItemComments";
import DialogBiddingHistory from "@/components/dialog/DialogBiddingHistory";

import { FtMiddleButton } from "@/components/ui/FtButton";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy } from "firebase/firestore";

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
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSelector, useDispatch } from "react-redux";
import item, { fetchItem, updateItem } from "@/store/item";
import { fetchComments } from "@/store/comment";
import { fetchBiddings } from "@/store/bidding";
import DialogImage from "@/components/pages/shop/DialogImage";

import ItemMenu from "@/components/pages/item/ItemMenu";
import LikeButton from "@/components/ui/LikeButton";

import DisplayItemStatus from "@/components/pages/item/DisplayItemStatus";

import { currentBiddingPrice } from "@/plugins/mixin";
import { ToFinish, ToPrice } from "@/plugins/filter";
import { GoCommentDiscussion } from "react-icons/go";

import useSyncTime from "@/helpers/clock";
import { useState } from "react";

const ItemShow = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentSeconds = useSyncTime(1000);

  const [isSelling, setIsSelling] = useState(false);

  const { itemId } = router.query;
  const bindItem = useSelector((state) => state.item.item);
  const bindBiddings = useSelector((state) => state.bidding.biddings);

  const dialogPostBidding = useRef(null);
  const dialogBiddingHistory = useRef(null);

  const dialogImage = useRef();

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
          isOnSnapshot: true,
          type: "fetch",
        })
      );

      dispatch(
        fetchBiddings({
          query: query(
            collection(db, `items/${itemId}/biddings`),
            orderBy("price", "desc")
          ),
          isOnSnapshot: true,
          type: "fetch",
        })
      );
      dispatch(
        fetchComments({
          query: query(collection(db, `items/${itemId}/comments`)),
          isOnSnapshot: true,
          type: "fetch",
        })
      );
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindItem?.itemStatus === 3) {
      setIsSelling(true);
    }
  }, [bindItem]);

  useEffect(() => {
    if (
      bindItem &&
      bindItem.itemStatus === 3 &&
      bindItem.sale.finishedAt.seconds < currentSeconds
    ) {
      dispatch(
        updateItem({
          id: bindItem.id,
          itemStatus: 4,
        })
      );
      setIsSelling(false);
    }
  }, [currentSeconds]);

  const openDialogBidding = () => {
    dialogPostBidding.current.openDialog();
  };

  const openDialogBiddingHistory = () => {
    dialogBiddingHistory.current.openDialog();
  };

  return (
    <>
      {bindItem && bindBiddings && (
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

              {bindItem.sale.startedAt && (
                <Box>
                  <Stack
                    direction="row"
                    borderBottom="2px"
                    borderColor="primary"
                    align="end"
                    pt="10"
                  >
                    <Text fontSize="md" fontWeight="bold" color="primary">
                      {ToPrice(
                        currentBiddingPrice({
                          biddings: bindBiddings,
                          startPrice: bindItem.sale.startPrice,
                        })
                      )}
                    </Text>
                    <Spacer></Spacer>
                    <Text fontWeight={700} fontSize="xs">
                      {ToFinish({
                        finishedSeconds: bindItem.sale.finishedAt.seconds,
                      })}
                    </Text>
                  </Stack>

                  {isSelling && (
                    <Center pt="2">
                      <FtMiddleButton onClick={openDialogBidding}>
                        入札する
                      </FtMiddleButton>
                    </Center>
                  )}

                  {bindBiddings.length > 0 && (
                    <Box>
                      <Button
                        variant="link"
                        size="sm"
                        mt="5"
                        onClick={openDialogBiddingHistory}
                        className="underline"
                      >
                        <Icon
                          as={GoCommentDiscussion}
                          boxSize="4"
                          mr="2"
                        ></Icon>
                        {bindBiddings.length}件の入札履歴を見る
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

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
                <Box>
                  <ItemComments></ItemComments>
                </Box>
              </Box>
            </Box>
          </HStack>

          <Box width="600px" mx="auto" p="10">
            <Text fontSize="sm">{bindItem.description}</Text>
          </Box>
          {/* dialog */}

          {bindItem.sale.startedAt && (
            <>
              {isSelling && (
                <DialogPostBidding ref={dialogPostBidding}></DialogPostBidding>
              )}
              <DialogBiddingHistory
                ref={dialogBiddingHistory}
              ></DialogBiddingHistory>
            </>
          )}

          <DialogImage ref={dialogImage}></DialogImage>
        </>
      )}
    </>
  );
};

export default ItemShow;
