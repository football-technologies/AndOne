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

const ItemMiddleCard = ({ item }) => {
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
          href={`/items/${item.id}`}
          passHref
          _hover={{ textDecoration: "none" }}
        >
          <a>
            <AspectRatio ratio={1}>
              <Image src={item.images[0].url}></Image>
            </AspectRatio>

            <Box p="5" pb="2">
              <Heading as="h3" fontSize="md" noOfLines={2}>
                {item.name}
              </Heading>

              <Stack direction="row" align="center" pt="5">
                <Avatar
                  size="sm"
                  name="imoto"
                  src="https://bit.ly/broken-link"
                />
                <Text fontSize="xs" noOfLines={2}>
                  {item.shop.name}
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
