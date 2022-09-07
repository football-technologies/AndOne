import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NextLink from "next/link";
import { fetchShops } from "@/store/shop";
import { Box, Button } from "@chakra-ui/react";

const ShopIndex = () => {
  const bindShops = useSelector((state) => state.shop.shops);

  console.log(">>>>>>>> bindShops", bindShops);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchShops({
        query: `shops`,
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
