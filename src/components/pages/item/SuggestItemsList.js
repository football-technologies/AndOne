import { useEffect } from "react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { Text, Wrap, Stack, Divider, Box } from "@chakra-ui/react";

import { fetchItems } from "@/store/item";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/plugins/firebase";
import { where, query, collection } from "firebase/firestore";
import _ from "lodash";

const SuggestItemsList = ({ itemId }) => {
  const bindItems = useSelector((state) => state.item.items);
  const shuffledItems = _.shuffle(bindItems);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(collection(db, "items"), where("id", "!=", itemId)),
        isOnSnapshot: false,
        type: "fetch",
      })
    );
  }, [dispatch]);

  return (
    <>
      <Divider></Divider>
      <Text fontWeight="700" display="block" textAlign="center" pt="10" pb="5">
        関連アイテム
      </Text>
      {shuffledItems && (
        <Wrap p="1%" spacing="0">
          {shuffledItems.map((item) => {
            return (
              <Box w="25%" p="1%" key={item.id}>
                <ItemMiddleCard item={item}></ItemMiddleCard>
              </Box>
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default SuggestItemsList;
