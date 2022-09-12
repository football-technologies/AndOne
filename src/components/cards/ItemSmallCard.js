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
import { ToPrice } from "@/plugins/filter";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import { useState } from "react";
import DisplayTimeToFinish from "@/components/pages/item/DisplayTimeToFinish";

const ItemSmallCard = ({ item }) => {
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
        p="10"
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
            <Stack direction={["column", "row"]} align="center">
              <Box w="100px">
                <AspectRatio ratio={1}>
                  <Image src={item.images[0].url} borderRadius="10px"></Image>
                </AspectRatio>
              </Box>

              <Box w="40%" px="5">
                <Heading as="h3" fontSize="md" noOfLines={2}>
                  {item.name}
                </Heading>
                <Text fontSize="xs" noOfLines={4} pt="2">
                  {item.description}{" "}
                </Text>
              </Box>

              <Box w="30%">
                <Stack direction="row" align="center">
                  <Avatar
                    size="sm"
                    name={item.shop.name}
                    src={item.shop.icon}
                  />
                  <Text fontSize="xs" noOfLines={2}>
                    {item.shop.name}
                  </Text>
                </Stack>
              </Box>
              <Box w="20%">
                <Stack
                  direction="row"
                  align="center"
                  justify="space-between"
                  pt="2"
                >
                  {item.sale.startedAt && bindBiddings && (
                    <>
                      <Text fontSize="md" fontWeight="bold" color="primary">
                        {ToPrice(currentPrice)}
                      </Text>
                      <Text fontSize="xs">
                        <DisplayTimeToFinish item={item}></DisplayTimeToFinish>
                      </Text>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          </a>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemSmallCard;
