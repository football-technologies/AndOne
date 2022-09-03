import { Stack, Image, Text, Box, AspectRatio } from "@chakra-ui/react";
import NextLink from "next/link";

const ItemExtraSmallCard = () => {
  return (
    <>
      <Stack
        w="100%"
        p="2"
        borderBottom="1px"
        borderColor="lightGray"
        _hover={{ bg: "paleGray", borderColor: "darkGrey" }}
      >
        <NextLink
          href="/items/123"
          passHref
          _hover={{ textDecoration: "none" }}
        >
          <>
            <Stack direction={["column", "row"]} align="center">
              <Box w="50px">
                <AspectRatio ratio={1}>
                  <Image
                    src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"
                    borderRadius="5px"
                  ></Image>
                </AspectRatio>
              </Box>

              <Box w="40%" px="2">
                <Text fontSize="small" fontWeight="bold" color="primary">
                  7,800円
                </Text>

                <Text fontSize="small" noOfLines={2}>
                  Nike International 2012 Black Edition ああああああああああああ
                  Nike International 2012 Black Edition ああああああああああああ
                </Text>
              </Box>
            </Stack>
          </>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemExtraSmallCard;
