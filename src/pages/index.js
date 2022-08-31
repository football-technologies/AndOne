import { db } from "@/plugins/firebase";
import { getDoc, doc } from "firebase/firestore";

import { useState, useEffect } from "react";

import { Button } from "@chakra-ui/react";

export default function Home() {
  const [dummy, setDummy] = useState();

  useEffect(() => {
    getDoc(doc(db, "dummy/PBx2t0p8lF6gO59WzQEw")).then((doc) => {
      if (doc.id) {
        console.log(">>>>>>> id", doc.data());
        setDummy(doc.data().name);
      }
    });
  }, []);

  return <Button>name: {dummy}</Button>;
}
