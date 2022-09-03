import {
  Stack,
  Image,
  Heading,
  Avatar,
  Text,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import NextLink from "next/link";

const ItemMiddleCard = () => {
  return (
    <>
      <Stack
        w="100%"
        borderWidth="1px"
        borderRadius="10px"
        overflow="hidden"
        _hover={{ bg: "paleGray", borderColor: "darkGrey" }}
      >
        <NextLink
          href="/items/123"
          passHref
          _hover={{ textDecoration: "none" }}
        >
          <a>
            <AspectRatio ratio={1}>
              <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
            </AspectRatio>

            <Box p="5" pb="2">
              <Heading as="h3" fontSize="md" noOfLines={2}>
                Nike International 2012 Black Edition ああああああああああああ
              </Heading>

              <Stack direction="row" align="center" pt="5">
                <Avatar
                  size="sm"
                  name="imoto"
                  src="https://bit.ly/broken-link"
                />
                <Text fontSize="xs" noOfLines={2}>
                  芝浦World National Grally ３号点
                </Text>
              </Stack>

              <Stack
                direction="row"
                align="center"
                justify="space-between"
                pt="2"
              >
                <Text fontSize="md" fontWeight="bold" color="primary">
                  7,800円
                </Text>
                <Text fontSize="xs">残り 23時間42分</Text>
              </Stack>
            </Box>
          </a>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemMiddleCard;
