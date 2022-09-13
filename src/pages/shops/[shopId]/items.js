import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import DisplayItemStatus from "@/components/pages/item/DisplayItemStatus";
import { FtMiddleButtonOutlined } from "@/components/ui/FtButton";
import { db } from "@/plugins/firebase";
import { fetchItems } from "@/store/item";
import { Wrap, Box, Button, Icon } from "@chakra-ui/react";
import { where, query, collection, orderBy } from "firebase/firestore";
import _ from "lodash";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

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

      return () => {
        dispatch(
          fetchItems({
            query: query(
              collection(db, "items"),
              where("shop.id", "==", shopId),
              orderBy("createdAt", "desc")
            ),
            isOnSnapshot: true,
            type: "delete",
          })
        );
      };
    }
  }, [router.isReady]);

  return (
    <>
      <Wrap justify="space-between" p="5" spacing="0">
        <NextLink href={`/items/new`}>
          <FtMiddleButtonOutlined>+ アイテムを追加</FtMiddleButtonOutlined>
        </NextLink>
        <NextLink href={`/shops/${shopId}`}>
          <Button as="a" variant="link">
            Go to Shop Page
            <Icon as={MdArrowForward} ml="1"></Icon>
          </Button>
        </NextLink>
      </Wrap>

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
