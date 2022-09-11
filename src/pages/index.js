import { useEffect } from "react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { Button, Wrap, Stack, Divider } from "@chakra-ui/react";

import { fetchItems } from "@/store/item";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy } from "firebase/firestore";

export default function Home() {
  const bindItems = useSelector((state) => state.item.items);
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
      <Button as="a" m="5" href="/items">
        items list
      </Button>
      <Divider></Divider>
      <Button as="a" m="5" href="/shops">
        shops list
      </Button>
      <Button as="a" m="5" href="/tags">
        tags list
      </Button>

      {bindItems && (
        <Wrap p="5">
          {bindItems.map((item) => {
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
}
