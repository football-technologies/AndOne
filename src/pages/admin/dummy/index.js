import { Box, Button } from "@chakra-ui/react";
import { functions } from "@/plugins/firebase";
import { httpsCallable } from "firebase/functions";
import FtUiPallet from "@/components/ui/FtUiPallet";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
        <LoadingSpinner size={"xl"} isLoading={true}></LoadingSpinner>
      </Box>
    </>
  );
};

export default DummyIndex;
