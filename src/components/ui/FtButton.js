import { Button } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";

const FtLargeButton = forwardRef((props, ref) => {
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

const FtLargeButtonOutlined = forwardRef((props, ref) => {
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

const FtMiddleButton = forwardRef((props, ref) => {
  return (
    <Button
      bg="primary"
      color="white"
      borderStyle="solid"
      borderWidth="2px"
      borderColor="primary"
      fontSize="14px"
      rounded="full"
      ref={ref}
      px={10}
      py={2}
      _hover={{ bg: "hover", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

const FtMiddleButtonOutlined = forwardRef((props, ref) => {
  return (
    <Button
      variant="outline"
      borderStyle="solid"
      borderWidth="2px"
      borderColor="primary"
      color="primary"
      fontSize="14px"
      rounded="full"
      ref={ref}
      px={10}
      py={2}
      _hover={{ bg: "hover", color: "white", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

const FtSmallButton = forwardRef((props, ref) => {
  return (
    <Button
      bg="primary"
      color="white"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="primary"
      fontSize="10px"
      rounded="full"
      ref={ref}
      px={4}
      py={0}
      height="2.5em"
      _hover={{ bg: "hover", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

const FtSmallButtonOutlined = forwardRef((props, ref) => {
  return (
    <Button
      variant="outline"
      borderStyle="solid"
      borderWidth="1px"
      borderColor="primary"
      color="primary"
      fontSize="10px"
      rounded="full"
      ref={ref}
      px={4}
      py={0}
      height="2.5em"
      _hover={{ bg: "hover", color: "white", borderColor: "hover" }}
      letterSpacing="0.1em"
      {...props}
    />
  );
});

export {
  FtLargeButton,
  FtLargeButtonOutlined,
  FtMiddleButton,
  FtMiddleButtonOutlined,
  FtSmallButton,
  FtSmallButtonOutlined,
};
