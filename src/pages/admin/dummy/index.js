import { Button } from "@chakra-ui/react";
import { functions } from "@/plugins/firebase";
import { httpsCallable } from "firebase/functions";

import { useToast } from "@chakra-ui/react";

const DummyIndex = () => {
  const toast = useToast();
  const id = "test";

  const helloOnCall = async () => {
    const hello = httpsCallable(functions, "v1-callable-hello");
    console.log(">>>>>> Start");
    const result = await hello();
    console.log(">>>>>> Return: ->", result);
  };

  return (
    <>
      <Button
        onClick={() => {
          console.log(toast.isActive(id));
          if (toast.isActive(id)) {
            return false;
          }
          toast({
            id: id,
            position: "top",
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }}
      >
        Show Toast
      </Button>
      <Button onClick={helloOnCall}>Hello On Call</Button>;
    </>
  );
};

export default DummyIndex;
