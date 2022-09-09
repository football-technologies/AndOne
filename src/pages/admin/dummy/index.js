import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { functions } from "@/plugins/firebase";
import { httpsCallable } from "firebase/functions";
import FtUiPallet from "@/components/ui/FtUiPallet";

import GetCurrentSeconds from "@/helpers/clock";
import { useEffect } from "react";

const DummyIndex = () => {
  const helloOnCall = async () => {
    const hello = httpsCallable(functions, "v1-callable-hello");
    console.log(">>>>>> Start");
    const result = await hello();
    console.log(">>>>>> Return: ->", result);
  };

  useEffect(() => {
    console.log(">>>>>>> hello");
  }, []);

  return (
    <>
      <h1>{GetCurrentSeconds(1000)}</h1>

      <Box p="10" bg="paleGray">
        <Box>
          <h3>functions</h3>
          <Button colorScheme="red" onClick={helloOnCall}>
            Hello On Call
          </Button>
        </Box>

        <Box>
          <FtUiPallet></FtUiPallet>
        </Box>
      </Box>
    </>
  );
};

export default DummyIndex;
