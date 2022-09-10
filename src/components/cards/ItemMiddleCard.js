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
import { ToFinish, ToPrice } from "@/plugins/filter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy } from "firebase/firestore";

const ItemMiddleCard = ({ item }) => {
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
                <Avatar
                  size="sm"
                  name="imoto"
                  src="https://bit.ly/broken-link"
                />
                <Text fontSize="xs" noOfLines={2}>
                  {item.shop.name}
                </Text>
              </Stack>

              {item.sale.startedAt && bindBiddings && (
                <Stack
                  direction="row"
                  align="center"
                  justify="space-between"
                  pt="2"
                >
                  <Text fontSize="md" fontWeight="bold" color="primary">
                    {ToPrice(
                      currentBiddingPrice({
                        biddings: bindBiddings,
                        startPrice: item.sale.startPrice,
                      })
                    )}
                  </Text>
                  <Text fontSize="xs">
                    {ToFinish({
                      finishedSeconds: item.sale.finishedAt.seconds,
                    })}
                  </Text>
                </Stack>
              )}
            </Box>
          </a>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemMiddleCard;
