import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NextLink from "next/link";
import { fetchItems } from "@/store/item";
import { Box, Button } from "@chakra-ui/react";

const ItemIndex = () => {
  const bindItems = useSelector((state) => state.item.items);

  console.log(">>>>>>>> bindItems", bindItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchItems({
        query: `items`,
        type: "fetch",
      })
    );
  }, []);

  return (
    <>
      {bindItems &&
        bindItems.map((item) => {
          return (
            <Button variant="outline" key={item.id}>
              <NextLink href={`/items/${item.id}`} passHref>
                <a>
                  {item.id}:{item.name}
                </a>
              </NextLink>
            </Button>
          );
        })}
    </>
  );
};

export default ItemIndex;
