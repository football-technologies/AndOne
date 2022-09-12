import { useEffect } from "react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { Text, Wrap, Stack, Divider } from "@chakra-ui/react";

import { fetchItems } from "@/store/item";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/plugins/firebase";
import { where, query, collection, orderBy } from "firebase/firestore";
import _ from "lodash";

const SuggestItemsList = ({ itemId }) => {
  const bindItems = useSelector((state) => state.item.items);
  const shuffledItems = _.shuffle(_.cloneDeep(bindItems));

  console.log(">>>>>>>>> bindItems", bindItems);
  // console.log(">>>>>>>>> bindItems", bindItems);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(
          collection(db, "items"),
          where("id", "!=", itemId)
          // orderBy("createdAt", "desc")
        ),
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
        <Wrap p="5">
          {shuffledItems.map((item) => {
            return (
              <Stack isInline w="23%" p="1%" key={item.id}>
                <ItemMiddleCard item={item}></ItemMiddleCard>
              </Stack>
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default SuggestItemsList;
