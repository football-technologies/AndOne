import { FtButtonOutlinedSmall } from "@/components/ui/FtButton";
import {
  Box,
  Stack,
  Image,
  AspectRatio,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const ItemShow = () => {
  const router = useRouter();
  const { itemId } = router.query;

  console.log(">>>>>>>> itemId", itemId);

  return (
    <>
      <Stack direction="row">
        <Box width="70%">
          <Stack direction="row">
            <Box width="100px">
              <AspectRatio ratio={1}>
                <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
              </AspectRatio>
            </Box>
            <Box>
              <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
            </Box>
          </Stack>
        </Box>
        <Box width="30%">
          <Heading as="h1" fontSize="md">
            Nike International 2012 Black Edition ああああああああああああ
            <FtButtonOutlinedSmall>watch</FtButtonOutlinedSmall>
          </Heading>

          <Stack
            direction="row"
            borderBottom="2px"
            borderColor="primary"
            align="end"
          >
            <Text fontSize="md" fontWeight="bold" color="primary">
              7,800円
            </Text>
            <Text fontSize="xs">残り 23時間42分</Text>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default ItemShow;
