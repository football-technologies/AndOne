import { useRouter } from "next/router";
import { useEffect } from "react";

const ItemForm = () => {
  const router = useRouter();

  console.log(">>>>>> init router.query", router.query);

  useEffect(() => {
    console.log(">>>>>> useEffect", router.query);
    if (router.isReady) {
      console.log(">>>>>> useEffect is Ready:", router.query);
    }
  }, [router.isReady]);

  return (
    <>
      <div>ItemForm</div>
    </>
  );
};

export default ItemForm;
