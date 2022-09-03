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

const ItemSmallCard = () => {
  return (
    <>
      <Stack
        w="100%"
        p="10"
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
              <Box w="100px">
                <AspectRatio ratio={1}>
                  <Image
                    src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"
                    borderRadius="10px"
                  ></Image>
                </AspectRatio>
              </Box>

              <Box w="40%" px="5">
                <Heading as="h3" fontSize="md" noOfLines={2}>
                  Nike International 2012 Black Edition ああああああああああああ
                </Heading>
                <Text fontSize="xs" noOfLines={4} pt="2">
                  ミッドソールに開けたウインドウから適度な圧が解放されるようになり、エアバッグにより多量のエアを充填できることとなった。このことから、エアマックスに搭載されているエアバッグは「マキシマムエア」や「マックスエア」と呼称されることとなる。この「エアマックス」という製品名に関してかなり厳格であり、舗装路用ランニングシューズでビジブルエア搭載かつ最大容量のエア搭載の最上位モデルにその名が冠せられることとなった。ただしこのネーミングに関しては、当時からエア・スタブやエア180、エアクラシックBWなどの例外も存在し、エアマックスCB34やエアノモマックスなどランニングシューズ以外にも適応されるようになっている。また現在では、最上位モデルのシューズでない所謂廉価版シューズであってもエアマックスと冠するシューズが存在するなど、その呼称に関しては当時ほど厳格ではない。
                </Text>
              </Box>

              <Box w="30%">
                <Stack direction="row" align="center">
                  <Avatar
                    size="sm"
                    name="imoto"
                    src="https://bit.ly/broken-link"
                  />
                  <Text fontSize="xs" noOfLines={2}>
                    芝浦World National Grally ３号点
                  </Text>
                </Stack>
              </Box>
              <Box w="20%">
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
            </Stack>
          </>
        </NextLink>
      </Stack>
    </>
  );
};

export default ItemSmallCard;
