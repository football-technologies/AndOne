import { functions } from "@/plugins/firebase";
import { Button } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";

export default function DummyIndex() {
  const helloOnCall = async () => {
    const hello = httpsCallable(functions, "v1-callable-hello");
    console.log(">>>>>> Start");
    const result = await hello();
    console.log(">>>>>> Return: ->", result);
  };

  return (
    <>
      <Button onClick={helloOnCall}>Hello on Call</Button>
    </>
  );
}
