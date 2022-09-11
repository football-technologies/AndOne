import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import NextLink from "next/link";
import { fetchShops } from "@/store/shop";
import { Button } from "@chakra-ui/react";

import { db } from "@/plugins/firebase";
import { collection } from "firebase/firestore";

const ShopIndex = () => {
  const bindShops = useSelector((state) => state.shop.shops);

  console.log(">>>>>>>> bindShops", bindShops);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchShops({
        query: collection(db, "shops"),
        isOnSnapshot: true,
        type: "fetch",
      })
    );
  }, []);

  return (
    <>
      {bindShops &&
        bindShops.map((shop) => {
          return (
            <Button variant="outline" key={shop.id}>
              <NextLink href={`/shops/${shop.id}`} passHref>
                <a>
                  {shop.id}:{shop.name}
                </a>
              </NextLink>
            </Button>
          );
        })}
    </>
  );
};

export default ShopIndex;
