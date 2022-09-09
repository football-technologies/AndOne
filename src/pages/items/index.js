import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NextLink from "next/link";
import { fetchItems } from "@/store/item";
import { Box, Button, Text } from "@chakra-ui/react";

import { db } from "@/plugins/firebase";
import { query, collection, orderBy } from "firebase/firestore";

import GetCurrentSeconds from "@/helpers/clock";
import { useState } from "react";
import DisplayLeftTime from "@/components/pages/item/DisplayLeftTime";

const ItemIndex = () => {
  const bindItems = useSelector((state) => state.item.items);

  console.log(">>>>>>>> bindItems", bindItems);
  const dispatch = useDispatch();

  let seconds = GetCurrentSeconds(3000);

  console.log(">>>>>> GetCurrentSeconds(1000):", GetCurrentSeconds(3000));

  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(collection(db, "items"), orderBy("createdAt", "desc")),
        type: "fetch",
      })
    );
    console.log(">>>>>>> fetch Item");
  }, []);

  return (
    <>
      {bindItems &&
        bindItems.map((item) => {
          return (
            <Box key={item.id}>
              <Button variant="outline" key={item.id}>
                <NextLink href={`/items/${item.id}`} passHref>
                  <a>
                    {item.id}:{item.name}
                  </a>
                </NextLink>

                <Text color="orange">{item.createdAt.seconds}</Text>
                <Text color="gray">{seconds}</Text>
              </Button>

              <DisplayLeftTime
                currentSeconds={seconds}
                finishedSeconds={item.sale.finishedAt.seconds}
              ></DisplayLeftTime>
            </Box>
          );
        })}
    </>
  );
};

export default ItemIndex;
