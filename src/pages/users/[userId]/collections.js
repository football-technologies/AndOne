import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import ItemSmallCard from "@/components/cards/ItemSmallCard";
import _ from "lodash";
import { Text } from "@chakra-ui/react";

const Collections = () => {
  const currentUser = useSelector((state) => state.account);
  const [items, setItems] = useState();

  const getItems = async () => {
    const _items = [];
    const q = query(
      collection(db, `items`),
      where("sold.user.id", "==", currentUser.id)
    );
    await getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id) {
          _items.push(doc.data());
        }
      });
    });

    setItems(_items);
  };

  useEffect(() => {
    getItems();
  }, [currentUser.id]);

  return (
    <>
      {items && items.length > 0 ? (
        items.map((item) => {
          return <ItemSmallCard item={item} key={item.id}></ItemSmallCard>;
        })
      ) : (
        <Text display="block" textAlign="center" p="10">
          購入済みアイテムは、まだありません。
        </Text>
      )}
    </>
  );
};

export default Collections;
