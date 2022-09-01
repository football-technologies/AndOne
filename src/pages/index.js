import { db } from "@/plugins/firebase";
import { getDoc, doc } from "firebase/firestore";

import { useState, useEffect } from "react";

import { Box, Button, Text } from "@chakra-ui/react";

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
          <Text>
            最近はスマートフォンからWebサイトを閲覧するユーザーが増え、制作におけるスマートフォン対策は必須となりました。そのため、レスポンシブWebデザインを導入することも多くなり、HTML5とCSS3でのWebサイト制作の需要が高まっています。
            今回は、最新のWebサイト制作に欠かせないHTML5・CSS3とはなにか、制作に必要な習得スキルにはどんなものがあるかを考えてみます。
          </Text>
          <Button>name: {dummy.name}</Button>
          <h3>createdAt: {ToFullDate(dummy.createdAt)}</h3>
          <h3>toAgo: {ToAgo(dummy.createdAt)}</h3>
        </>
      )}
    </>
  );
}
