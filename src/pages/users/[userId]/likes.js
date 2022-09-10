import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchShops } from "@/store/shop";
import { db } from "@/plugins/firebase";
import { query, collection, orderBy, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import ShopMiddleCard from "@/components/cards/ShopMiddleCard";
import _ from "lodash";
import { Wrap, Stack } from "@chakra-ui/react";

const Likes = () => {
  const bindShops = useSelector((state) => state.shop.shops);
  const currentUser = useSelector((state) => state.account);
  const [shopIds, setShopIds] = useState();

  const dispatch = useDispatch();

  const getShopIds = async () => {
    const likes = [];
    const q = query(
      collection(db, `users/${currentUser.id}/likes`),
      where("item.id", "==", null)
    );

    await getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id) {
          likes.push(doc.data());
        }
      });
    });

    const _shopIds = _.map(likes, (like) => {
      return like.shop.id;
    });

    setShopIds(_shopIds);
  };

  useEffect(() => {
    getShopIds();
  }, [currentUser.id]);

  useEffect(() => {
    if (shopIds && shopIds.length > 0) {
      // TODO: shopIds.length > 10 の場合の処理が必要
      dispatch(
        fetchShops({
          query: query(collection(db, "shops"), where("id", "in", shopIds)),
          isOnSnapshot: true,
          type: "fetch",
        })
      );
    }
  }, [shopIds]);

  return (
    <>
      <Wrap p="5">
        {bindShops &&
          bindShops.map((shop) => {
            return (
              <Stack w="31%" p="1%" key={shop.id}>
                <ShopMiddleCard shop={shop}></ShopMiddleCard>;
              </Stack>
            );
          })}
      </Wrap>
    </>
  );
};

export default Likes;
