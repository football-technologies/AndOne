import { query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ItemForm = () => {
  const router = useRouter();

  console.log(">>>>>> init router", router);
  console.log(">>>>>> init router.query", router.query);

  useEffect(() => {
    console.log(">>>>>> useEffect", router.query);
  }, []);

  return (
    <>
      <div>ItemForm</div>
    </>
  );
};

export default ItemForm;
