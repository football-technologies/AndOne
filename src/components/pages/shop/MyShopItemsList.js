import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchItems } from "@/store/item";
import { db } from "@/plugins/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from "firebase/firestore";

import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Wrap,
  Heading,
  Link,
  Text,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";

const MyShopItemsList = ({ shopId }) => {
  const dispatch = useDispatch();
  const bindItems = useSelector((state) => state.item.items);

  console.log(">>>>>>>>>>> bindItems", bindItems);
  useEffect(() => {
    console.log(">>>>>>>>>>> useEffect", shopId);

    dispatch(
      fetchItems({
        query: query(
          collection(db, "items"),
          where("shop.id", "==", shopId),
          orderBy("createdAt", "desc")
        ),
        type: "fetch",
      })
    );
  }, []);

  return (
    <>
      {bindItems && (
        <>
          <Box w="600px" mx="auto" pt="10" mt="10">
            <Tabs isFitted colorScheme="primary">
              <TabList>
                <Tab>All ({bindItems.length})</Tab>
                <Tab>On Sale (323)</Tab>
                <Tab>Sold (513)</Tab>
              </TabList>
            </Tabs>
          </Box>

          <Box pt="5">
            <Wrap p="5">
              {bindItems.map((item) => {
                return (
                  <Stack isInline w="23%" p="1%" key={item.id}>
                    <ItemMiddleCard item={item}></ItemMiddleCard>
                  </Stack>
                );
              })}
            </Wrap>
          </Box>
        </>
      )}
    </>
  );
};

export default MyShopItemsList;
