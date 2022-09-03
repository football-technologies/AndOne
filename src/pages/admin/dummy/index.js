import { Box, Button, useToast, Text, Stack } from "@chakra-ui/react";
import { functions } from "@/plugins/firebase";
import { httpsCallable } from "firebase/functions";
import FtUiPallet from "@/components/ui/FtUiPallet";

const DummyIndex = () => {
  const helloOnCall = async () => {
    const hello = httpsCallable(functions, "v1-callable-hello");
    console.log(">>>>>> Start");
    const result = await hello();
    console.log(">>>>>> Return: ->", result);
  };

  const toast = useToast();
  const click = () => {
    toast({
      position: "top",
      duration: 6000,
      // isClosable: true,
      render: ({ id, onClose }) => (
        <Box
          display={"inline-block"}
          color="white"
          p={3}
          bg="black"
          rounded="full"
        >
          sssssssss
        </Box>
      ),
    });
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
        <Box>
          <Button onClick={click}>toast</Button>
        </Box>
      </Box>
    </>
  );
};

export default DummyIndex;
