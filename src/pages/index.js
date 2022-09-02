import { db } from "@/plugins/firebase";
import { getDoc, doc } from "firebase/firestore";

import { useState, useEffect } from "react";

import ItemMiddleCard from "@/components/cards/ItemMiddleCard";
import ItemSmallCard from "@/components/cards/ItemSmallCard";
import { Box, Button, Wrap, Stack, Text, Divider } from "@chakra-ui/react";

import { ToFullDate, ToAgo } from "@/plugins/filter";

export default function Home() {
  const [dummy, setDummy] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "dummy/PBx2t0p8lF6gO59WzQEw")).then((doc) => {
      if (doc.id) {
        setDummy(doc.data());
      }
    });
  }, []);

  return (
    <>
      {[...Array(3)].map((_) => {
        return (
          <Stack px="10">
            <ItemSmallCard></ItemSmallCard>;
          </Stack>
        );
      })}

      <Wrap p="5">
        {[...Array(10)].map((_) => {
          return (
            <Stack isInline w="23%" p="1%">
              <ItemMiddleCard></ItemMiddleCard>
            </Stack>
          );
        })}
      </Wrap>
    </>
  );
}
