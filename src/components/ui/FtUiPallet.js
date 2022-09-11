import {
  FtLargeButton,
  FtLargeButtonOutlined,
  FtMiddleButton,
  FtMiddleButtonOutlined,
  FtSmallButton,
  FtSmallButtonOutlined,
} from "@/components/ui/FtButton";
import { Box, Text } from "@chakra-ui/react";

const FtUiPallet = () => {
  return (
    <>
      <Text pt="10">Button</Text>
      <Box bg="gray.400" p="10">
        <Box pt="5">
          <FtLargeButton>送信する</FtLargeButton>
          <small>{"<FtLargeButton>送信する</FtLargeButton>"}</small>
        </Box>

        <Box pt="5">
          <FtLargeButtonOutlined>送信する</FtLargeButtonOutlined>
          <small>
            {"<FtLargeButtonOutlined>送信する</FtLargeButtonOutlined>"}
          </small>
        </Box>

        <Box pt="5">
          <FtMiddleButton>送信する</FtMiddleButton>
          <small>{"<FtMiddleButton>送信する</FtMiddleButton>"}</small>
        </Box>

        <Box pt="5">
          <FtMiddleButtonOutlined>送信する</FtMiddleButtonOutlined>
          <small>
            {"<FtMiddleButtonOutlined>送信する</FtMiddleButtonOutlined>"}
          </small>
        </Box>

        <Box pt="5">
          <FtSmallButton>送信する</FtSmallButton>
          <small>{"<FtSmallButton>送信する</FtSmallButton>"}</small>
        </Box>

        <Box pt="5">
          <FtSmallButtonOutlined>送信する</FtSmallButtonOutlined>
          <small>
            {"<FtSmallButtonOutlined>送信する</FtSmallButtonOutlined>"}
          </small>
        </Box>
      </Box>
    </>
  );
};

export default FtUiPallet;
