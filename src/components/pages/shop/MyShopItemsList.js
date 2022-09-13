import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import { db } from "@/plugins/firebase";
import { fetchItems } from "@/store/item";
import { Box, Wrap, Tabs, TabList, Tab } from "@chakra-ui/react";
import { query, collection, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyShopItemsList = ({ shopId }) => {
  const dispatch = useDispatch();
  const bindItems = useSelector((state) => state.item.items);

  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(
          collection(db, "items"),
          where("shop.id", "==", shopId),
          where("itemStatus", ">=", 2)
        ),
        isOnSnapshot: true,
        type: "fetch",
      })
    );

    return () => {
      dispatch(
        fetchItems({
          query: query(
            collection(db, "items"),
            where("shop.id", "==", shopId),
            where("itemStatus", ">=", 2)
          ),
          isOnSnapshot: true,
          type: "delete",
        })
      );
    };
  }, [dispatch]);

  return (
    <>
      {bindItems && (
        <>
          <Box w="600px" mx="auto" pt="10" mt="10">
            <Tabs isFitted colorScheme="primary">
              <TabList>
                <Tab>All ({bindItems.length})</Tab>
                <Tab>
                  On Sale (
                  {bindItems.filter((item) => item.itemStatus === 3).length})
                </Tab>
                <Tab>
                  Sold (
                  {bindItems.filter((item) => item.itemStatus === 4).length})
                </Tab>
              </TabList>
            </Tabs>
          </Box>

          <Box pt="5">
            <Wrap p="1%" spacing="0">
              {bindItems.map((item) => {
                return (
                  <Box w="25%" p="1%" key={item.id}>
                    <ItemMiddleCard item={item}></ItemMiddleCard>
                  </Box>
                );
              })}
            </Wrap>
          </Box>
        </>
      )}
    </>
  );
};

export default MyShopItemsList;
