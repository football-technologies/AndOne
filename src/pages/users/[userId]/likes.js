import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import ShopMiddleCard from "@/components/cards/ShopMiddleCard";
import _ from "lodash";
import { Wrap, Stack, Text } from "@chakra-ui/react";

const Likes = () => {
  const currentUser = useSelector((state) => state.account);
  const [shopIds, setShopIds] = useState();
  const [shops, setShops] = useState();
  // const [likes, setLikes] = useState();

  const getShopIds = async () => {
    const _likes = [];
    const q = query(
      collection(db, `users/${currentUser.id}/likes`),
      where("item.id", "==", null)
    );

    await getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id) {
          _likes.push(doc.data());
        }
      });
    });

    const _shopIds = _.map(_likes, (like) => {
      return like.shop.id;
    });

    setShopIds(_shopIds);
  };

  const getShops = async () => {
    const _shops = [];

    for (const chunkedShopIds of _.chunk(shopIds, 10)) {
      const q = query(
        collection(db, `shops`),
        where("id", "in", chunkedShopIds)
      );
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            _shops.push(doc.data());
          }
        });
      });
    }

    setShops(_shops);
  };

  useEffect(() => {
    getShopIds();
  }, [currentUser.id]);

  useEffect(() => {
    if (shopIds && shopIds.length > 0) {
      getShops();
    }
  }, [shopIds]);

  return (
    <>
      <Wrap p="5">
        {shops && shops.length > 0 ? (
          shops.map((shop) => {
            return (
              <Stack w="31%" p="1%" key={shop.id}>
                <ShopMiddleCard shop={shop}></ShopMiddleCard>;
              </Stack>
            );
          })
        ) : (
          <Text display="block" textAlign="center" p="10">
            Likeしたショップは、まだありません。
          </Text>
        )}
      </Wrap>
    </>
  );
};

export default Likes;
