import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { db } from "@/plugins/firebase";
import { fetchItems } from "@/store/item";
import { Wrap, Box } from "@chakra-ui/react";
import { query, collection, where } from "firebase/firestore";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const bindItems = useSelector((state) => state.item.items);
  const shuffledItems = _.shuffle(bindItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(collection(db, "items"), where("itemStatus", ">=", 2)),
        isOnSnapshot: true,
        type: "fetch",
      })
    );

    return () => {
      dispatch(
        fetchItems({
          query: query(collection(db, "items"), where("itemStatus", ">=", 2)),
          isOnSnapshot: true,
          type: "delete",
        })
      );
    };
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
