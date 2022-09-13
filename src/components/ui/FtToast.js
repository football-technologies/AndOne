import { Box, useToast } from "@chakra-ui/react";

const useFtToast = () => {
  const toast = useToast();
  const ftToast = (message) => {
    toast({
      position: "top",
      duration: 6000,
      // isClosable: true,
      render: ({ id, onClose }) => (
        <Box
          display="inline-block"
          color="white"
          py="2"
          px="10"
          bg="black"
          rounded="md"
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
