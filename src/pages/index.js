import { db } from "@/plugins/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

import { Box, Button } from "@chakra-ui/react";

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
      <Box bg="black">aaa</Box>
      {dummy && (
        <>
          <Button>name: {dummy.name}</Button>
          <h3>createdAt: {ToFullDate(dummy.createdAt)}</h3>
          <h3>toAgo: {ToAgo(dummy.createdAt)}</h3>
        </>
      )}
    </>
  );
}
