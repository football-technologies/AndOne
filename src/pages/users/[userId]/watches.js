import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchItems } from "@/store/item";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import ItemSmallCard from "@/components/cards/ItemSmallCard";
import _ from "lodash";

const Watches = () => {
  const bindItems = useSelector((state) => state.item.items);
  const currentUser = useSelector((state) => state.account);
  const [itemIds, setItemIds] = useState();

  const dispatch = useDispatch();

  const getItemIds = async () => {
    const likes = [];
    const q = query(
      collection(db, `users/${currentUser.id}/likes`),
      where("shop.id", "==", null)
    );

    await getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id) {
          likes.push(doc.data());
        }
      });
    });

    const _itemIds = _.map(likes, (like) => {
      return like.item.id;
    });

    setItemIds(_itemIds);
  };

  useEffect(() => {
    getItemIds();
  }, [currentUser.id]);

  useEffect(() => {
    if (itemIds && itemIds.length > 0) {
      dispatch(
        fetchItems({
          query: query(
            collection(db, "items"),
            where("id", "in", itemIds),
            orderBy("createdAt", "desc")
          ),
          isOnSnapshot: true,
          type: "fetch",
        })
      );
    }
  }, [itemIds]);

  return (
    <>
      {bindItems &&
        bindItems.map((item) => {
          return <ItemSmallCard item={item}></ItemSmallCard>;
        })}
    </>
  );
};

export default Watches;
