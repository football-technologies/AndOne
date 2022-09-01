import { useToast } from "@chakra-ui/react";

const FtToast = () => {
  const toast = useToast();

  toast({
    position: "top",
    title: title,
    status: "error",
    duration: 2000,
    isClosable: true,
  });

  // return {
  //   FtToast
  // }
};

export { FtToast };
