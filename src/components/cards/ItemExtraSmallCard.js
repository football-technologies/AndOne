import { Stack, Image, Text, Box, AspectRatio } from "@chakra-ui/react";
import NextLink from "next/link";
import { currentBiddingPrice } from "@/plugins/mixin";
import { ToPrice } from "@/plugins/filter";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import { useState } from "react";
const ItemExtraSmallCard = ({ item }) => {
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
        p="2"
        borderBottom="1px"
        borderColor="lightGray"
        _hover={{ bg: "paleGray", borderColor: "darkGrey" }}
      >
        <NextLink
          href={`/items/${item.id}`}
          passHref
          _hover={{ textDecoration: "none" }}
        >
          <a>
            <Stack direction="row" align="center">
              <Box w="50px">
                <AspectRatio ratio={1}>
                  <Image src={item.images[0].url} borderRadius="5px"></Image>
                </AspectRatio>
              </Box>

              <Box w="100%" px="2">
                <Text fontSize="small" fontWeight="bold" color="primary">
                  {ToPrice(currentPrice)}
                </Text>

                <Text fontSize="small" noOfLines={2}>
                  {item.name}
                </Text>
              </Box>
            </Stack>
          </a>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemExtraSmallCard;
