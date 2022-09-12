import { useEffect } from "react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { Wrap, Box } from "@chakra-ui/react";

import { fetchItems } from "@/store/item";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy } from "firebase/firestore";
import _ from "lodash";

export default function Home() {
  const bindItems = useSelector((state) => state.item.items);
  const shuffledItems = _.shuffle(bindItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(collection(db, "items"), orderBy("createdAt", "desc")),
        isOnSnapshot: true,
        type: "fetch",
      })
    );
  }, []);
  return (
    <>
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
}
