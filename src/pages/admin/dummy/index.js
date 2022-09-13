import FtUiPallet from "@/components/ui/FtUiPallet";
import { functions } from "@/plugins/firebase";
import { Box, Button } from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";

const DummyIndex = () => {
  const helloOnCall = async () => {
    const hello = httpsCallable(functions, "v1-callable-hello");
    console.log(">>>>>> Start");
    const result = await hello();
    console.log(">>>>>> Return: ->", result);
  };

  return (
    <>
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

      {/* <ItemMiddleCard></ItemMiddleCard> */}
    </>
  );
};

export default DummyIndex;
