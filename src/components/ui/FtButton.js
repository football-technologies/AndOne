import { Button } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";

const FtButton = forwardRef((props, ref) => {
  return (
    <Button
      bg="primary"
      color="white"
      borderStyle="solid"
      borderWidth="2px"
      borderColor="primary"
      fontSize="16px"
      rounded="full"
      ref={ref}
      px={10}
      py={6}
      _hover={{ bg: "hover", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

const FtButtonSmall = forwardRef((props, ref) => {
  return (
    <Button
      bg="primary"
      color="white"
      borderStyle="solid"
      borderWidth="2px"
      borderColor="primary"
      fontSize="12px"
      rounded="full"
      ref={ref}
      px={5}
      py={2}
      _hover={{ bg: "hover", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

const FtButtonOutlined = forwardRef((props, ref) => {
  return (
    <Button
      variant="outline"
      borderStyle="solid"
      borderWidth="2px"
      borderColor="primary"
      color="primary"
      fontSize="16px"
      rounded="full"
      ref={ref}
      px={10}
      py={6}
      _hover={{ bg: "hover", color: "white", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

const FtButtonOutlinedSmall = forwardRef((props, ref) => {
  return (
    <Button
      variant="outline"
      borderStyle="solid"
      borderWidth="2px"
      borderColor="primary"
      color="primary"
      fontSize="12px"
      rounded="full"
      ref={ref}
      px={5}
      py={2}
      _hover={{ bg: "hover", color: "white", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

export { FtButton, FtButtonSmall, FtButtonOutlined, FtButtonOutlinedSmall };
