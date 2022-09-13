import { useEffect } from "react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { Wrap, Box, Button, Icon } from "@chakra-ui/react";

import { fetchItems } from "@/store/item";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/plugins/firebase";
import { where, query, collection, orderBy } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import DisplayItemStatus from "@/components/pages/item/DisplayItemStatus";

import { MdArrowForward } from "react-icons/md";
import NextLink from "next/link";

export default function Home() {
  const bindItems = useSelector((state) => state.item.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const { shopId } = router.query;

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        fetchItems({
          query: query(
            collection(db, "items"),
            where("shop.id", "==", shopId),
            orderBy("createdAt", "desc")
          ),
          isOnSnapshot: true,
          type: "fetch",
        })
      );
    }
  }, [router.isReady]);

  return (
    <>
      <Box textAlign="right" p="5">
        <NextLink href={`/shops/${shopId}`}>
          <Button as="a" variant="link">
            Go to Shop Page
            <Icon as={MdArrowForward} ml="1"></Icon>
          </Button>
        </NextLink>
      </Box>

      {bindItems && (
        <Wrap p="1%" spacing="0">
          {bindItems.map((item) => {
            return (
              <Box w="25%" p="1%" key={item.id}>
                <DisplayItemStatus item={item}></DisplayItemStatus>

                <ItemMiddleCard item={item}></ItemMiddleCard>
              </Box>
            );
          })}
        </Wrap>
      )}
    </>
  );
}
