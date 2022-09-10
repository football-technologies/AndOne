import {
  Stack,
  Image,
  Heading,
  Avatar,
  Center,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import NextLink from "next/link";

const ShopMiddleCard = ({ shop }) => {
  return (
    <>
      <Stack
        w="100%"
        maxWidth="300px"
        borderWidth="1px"
        borderRadius="10px"
        overflow="hidden"
        _hover={{ bg: "paleGray", borderColor: "darkGrey" }}
      >
        <NextLink
          href={`/shops/${shop.id}`}
          passHref
          _hover={{ textDecoration: "none" }}
        >
          <a>
            <AspectRatio ratio={3 / 2}>
              <Image src={shop.cover}></Image>
            </AspectRatio>
            <Box p="5" style={{ marginTop: "-45px" }}>
              <Avatar size="md" name={shop.name} src={shop.icon} />
              <Heading as="h3" fontSize="md" noOfLines={2} pt="5">
                {shop.name}
              </Heading>
            </Box>
          </a>
        </NextLink>
      </Stack>
    </>
  );
};

export default ShopMiddleCard;
