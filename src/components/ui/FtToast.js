import { Button, useToast } from "@chakra-ui/react";
import { Box, Icon } from "@chakra-ui/react";

const useFtToast = () => {
  const toast = useToast();
  const ftToast = (message) => {
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
          {message}
        </Box>
      ),
    });
  };

  return {
    ftToast,
  };
};

export default useFtToast;
