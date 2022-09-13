import DialogBiddingHistory from "@/components/dialog/DialogBiddingHistory";
import DialogPostBidding from "@/components/dialog/DialogPostBidding";
import DisplayItemStatus from "@/components/pages/item/DisplayItemStatus";
import DisplayTimeToFinish from "@/components/pages/item/DisplayTimeToFinish";
import ItemComments from "@/components/pages/item/ItemComments";
import ItemMenu from "@/components/pages/item/ItemMenu";
import SuggestItemsList from "@/components/pages/item/SuggestItemsList";
import DialogImage from "@/components/pages/shop/DialogImage";
import { FtMiddleButton } from "@/components/ui/FtButton";
import LikeButton from "@/components/ui/LikeButton";
import { ToPrice } from "@/plugins/filter";
import { db } from "@/plugins/firebase";
import { currentBiddingPrice } from "@/plugins/mixin";
import { fetchBiddings } from "@/store/bidding";
import { fetchComments } from "@/store/comment";
import { fetchItem } from "@/store/item";
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
  Container,
} from "@chakra-ui/react";
import { query, collection, orderBy } from "firebase/firestore";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";

const ItemShow = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
  }, [bindItem?.itemStatus]);

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
            <Box position="absolute" top="-30px" right="left" zIndex="2">
              <DisplayItemStatus item={bindItem}></DisplayItemStatus>
            </Box>

            <Stack width="70%">
              <Stack direction="row">
                {bindItem.images.length > 1 && (
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
                )}

                <Box>
                  <Image src={bindItem.images[0].url}></Image>
                </Box>
              </Stack>
            </Stack>

            <Box width="30%" p="5" position="relative">
              <ItemMenu item={bindItem}></ItemMenu>

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
                      <DisplayTimeToFinish
                        item={bindItem}
                        isSync={true}
                      ></DisplayTimeToFinish>
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

          <Container w="100%" maxW="1000px">
            <SuggestItemsList itemId={bindItem.id}></SuggestItemsList>
          </Container>

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
