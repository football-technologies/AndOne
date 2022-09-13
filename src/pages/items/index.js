import { db } from "@/plugins/firebase";
import { fetchItems } from "@/store/item";
import { Button } from "@chakra-ui/react";
import { query, collection, orderBy } from "firebase/firestore";
import NextLink from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ItemIndex = () => {
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
