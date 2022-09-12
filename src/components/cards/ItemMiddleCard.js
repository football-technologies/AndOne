import {
  Stack,
  Image,
  Heading,
  Avatar,
  Text,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { currentBiddingPrice } from "@/plugins/mixin";
import { ToFinish, ToPrice } from "@/plugins/filter";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import { useState } from "react";

const ItemMiddleCard = ({ item }) => {
  const [bindBiddings, setBindBiddings] = useState();
  const [currentPrice, setCurrentPrice] = useState();

  const getCurrentPrice = async () => {
    if (bindBiddings) {
      const _currentPrice = await currentBiddingPrice({
        biddings: bindBiddings,
        startPrice: item.sale.startPrice,
      });
      setCurrentPrice(_currentPrice);
    }
  };

  const getBiddings = async () => {
    const biddings = [];
    const q = query(
      collection(db, `items/${item.id}/biddings`),
      orderBy("price", "desc")
    );

    await onSnapshot(q, async (snapshot) => {
      if (snapshot) {
        await snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              biddings.splice(newIndex, 0, change.doc.data());
            }
          }
          if (change.type === "modified") {
            if (change.doc.data().id) {
              const newIndex = change.newIndex;
              biddings.splice(newIndex, 1, change.doc.data());
            }
          }
        });

        setBindBiddings([...biddings]);
      }
    });
  };

  useEffect(() => {
    getBiddings();
  }, []);

  useEffect(() => {
    getCurrentPrice();
  }, [bindBiddings]);

  return (
    <>
      <Stack
        w="100%"
        borderWidth="1px"
        borderRadius="10px"
        overflow="hidden"
        _hover={{ bg: "paleGray", borderColor: "darkGrey" }}
      >
        <NextLink
          href={`/items/${item.id}`}
          passHref
          _hover={{ textDecoration: "none" }}
        >
          <a>
            <AspectRatio ratio={1}>
              <Image src={item.images[0].url}></Image>
            </AspectRatio>

            <Box p="5" pb="2">
              <Heading as="h3" fontSize="md" noOfLines={2}>
                {item.name}
              </Heading>

              <Stack direction="row" align="center" pt="5">
                <Avatar size="sm" name={item.shop.name} src={item.shop.icon} />
                <Text fontSize="xs" noOfLines={2}>
                  {item.shop.name}
                </Text>
              </Stack>

              {item.sale.startedAt && bindBiddings ? (
                <Stack
                  direction="row"
                  align="end"
                  justify="space-between"
                  pt="2"
                >
                  <Text fontSize="md" fontWeight="bold" color="primary">
                    {ToPrice(currentPrice)}
                  </Text>
                  <Text fontSize="xs" className="nl2br" textAlign="right">
                    {ToFinish({
                      finishedSeconds: item.sale.finishedAt.seconds,
                    })}
                  </Text>
                </Stack>
              ) : (
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  pt="3"
                  display="block"
                  textAlign="center"
                >
                  発売準備中
                </Text>
              )}
            </Box>
          </a>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemMiddleCard;
