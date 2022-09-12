import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "@/plugins/firebase";
import {
  query,
  collection,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import ItemSmallCard from "@/components/cards/ItemSmallCard";
import _ from "lodash";
import { Text } from "@chakra-ui/react";

const Biddings = () => {
  const currentUser = useSelector((state) => state.account);
  const [itemIds, setItemIds] = useState();
  const [items, setItems] = useState();
  // const [likes, setLikes] = useState();

  const getItemIds = async () => {
    const _biddings = [];
    const q = query(
      collectionGroup(db, `biddings`),
      where("user.id", "==", currentUser.id)
    );

    await getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id) {
          _biddings.push(doc.data());
        }
      });
    });

    const _itemIds = _.map(_biddings, (bidding) => {
      return bidding.item.id;
    });

    setItemIds(_.uniq(_itemIds));
  };

  const getItems = async () => {
    const _items = [];

    for (const chunkedItemIds of _.chunk(itemIds, 10)) {
      const q = query(
        collection(db, `items`),
        where("id", "in", chunkedItemIds)
      );
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            _items.push(doc.data());
          }
        });
      });
    }

    setItems(_items);
  };

  useEffect(() => {
    getItemIds();
  }, [currentUser.id]);

  useEffect(() => {
    if (itemIds && itemIds.length > 0) {
      getItems();
    }
  }, [itemIds]);

  return (
    <>
      {items && items.length > 0 ? (
        items.map((item) => {
          return <ItemSmallCard item={item} key={item.id}></ItemSmallCard>;
        })
      ) : (
        <Text display="block" textAlign="center" p="10">
          入札済みアイテムは、まだありません。
        </Text>
      )}
    </>
  );
};

export default Biddings;
