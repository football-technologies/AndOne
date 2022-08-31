import {
  FtButton,
  FtButtonOutlined,
  FtButtonSmall,
  FtButtonOutlinedSmall,
} from "@/components/ui/FtButton";
import { Divider, VStack, Stack, Box, Text } from "@chakra-ui/react";

const FtUiPallet = () => {
  return (
    <>
      <Text pt="10">Button</Text>
      <Box bg="grey.400">
        <Box pt="5">
          <FtButton>送信する</FtButton>
          <small>{"<FtButton>送信する</FtButton>"}</small>
        </Box>
        <Box pt="5">
          <FtButtonSmall>送信する</FtButtonSmall>
          <small>{"<FtButtonSmall>送信する</FtButtonSmall>"}</small>
        </Box>
        <Box pt="5">
          <FtButtonOutlined>送信する</FtButtonOutlined>
          <small>{"<FtButtonOutlined>送信する</FtButtonOutlined>"}</small>
        </Box>
        <Box pt="5">
          <FtButtonOutlinedSmall>送信する</FtButtonOutlinedSmall>
          <small>
            {"<FtButtonOutlinedSmall>送信する</FtButtonOutlinedSmall>"}
          </small>
        </Box>
      </Box>
    </>
  );
};

export default FtUiPallet;
