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
import { fetchBiddings } from "@/store/bidding";
import { useDispatch } from "react-redux";
import { currentBiddingPrice } from "@/plugins/mixin";
import { ToPrice } from "@/plugins/filter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy } from "firebase/firestore";

const ItemExtraSmallCard = ({ item }) => {
  const dispatch = useDispatch();
  const bindBiddings = useSelector((state) => state.bidding.biddings);

  useEffect(() => {
    dispatch(
      fetchBiddings({
        query: query(
          collection(db, `items/${item.id}/biddings`),
          orderBy("price", "desc")
        ),
        isOnSnapshot: true,
        type: "fetch",
      })
    );
  }, []);

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
            <Stack direction={"row"} align="center">
              <Box w="50px">
                <AspectRatio ratio={1}>
                  <Image src={item.images[0].url} borderRadius="5px"></Image>
                </AspectRatio>
              </Box>

              <Box w="100%" px="2">
                <Text fontSize="small" fontWeight="bold" color="primary">
                  {bindBiddings &&
                    ToPrice(
                      currentBiddingPrice({
                        biddings: bindBiddings,
                        startPrice: item.sale.startPrice,
                      })
                    )}
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
