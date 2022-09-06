import { useRouter } from "next/router";
import { useRef } from "react";
import DialogPostBidding from "@/components/dialog/DialogPostBidding";

import {
  FtMiddleButton,
  FtSmallButtonOutlined,
} from "@/components/ui/FtButton";

import {
  Box,
  HStack,
  Stack,
  Image,
  AspectRatio,
  Heading,
  Text,
  Tag,
  Button,
  Link,
  Center,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";

const ItemShow = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const dialogPostBidding = useRef(null);

  console.log(">>>>>>>> itemId", itemId);

  const openDialogBidding = () => {
    dialogPostBidding.current.openDialog();
  };

  return (
    <>
      <HStack align="start">
        <Stack width="70%">
          <Stack direction="row">
            <Box width="100px">
              {[...Array(8)].map((_, index) => {
                return (
                  <Box key={index} pb="2">
                    <AspectRatio ratio={1}>
                      <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
                    </AspectRatio>
                  </Box>
                );
              })}
            </Box>
            <Box>
              <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
              <Text fontSize="xs" pt="2">
                caption: ああああああ
              </Text>
            </Box>
          </Stack>
        </Stack>

        <Box width="30%" p="5">
          <Heading as="h1" fontSize="md">
            Nike International 2012 Black Edition ああああああああああああaaaaa
            <FtSmallButtonOutlined ml="2">watch</FtSmallButtonOutlined>
          </Heading>

          <Stack
            direction="row"
            borderBottom="2px"
            borderColor="primary"
            align="end"
            pt="10"
          >
            <Text fontSize="md" fontWeight="bold" color="primary">
              7,800円
            </Text>
            <Spacer></Spacer>
            <Text fontWeight={700} fontSize="xs">
              残り 23時間42分
            </Text>
          </Stack>

          <Center pt="2">
            <FtMiddleButton onClick={openDialogBidding}>
              入札する
            </FtMiddleButton>
          </Center>

          <Box pt="10">
            <Text
              display="inline"
              fontSize="xs"
              p="1"
              border="1px"
              borderColor="lightGray"
            >
              作成年：2012年
            </Text>
          </Box>

          <Box pt={5}>
            <Button size="xs" variant="link" pr="2">
              #UK
            </Button>
            <Button size="xs" variant="link" pr="2">
              #2012
            </Button>
            <Button size="xs" variant="link" pr="2">
              #アーセナル
            </Button>
            <Button size="xs" variant="link" pr="2">
              #ARSENAL
            </Button>
            <Button size="xs" variant="link" pr="2">
              #Premier
            </Button>
          </Box>

          <Box pt="5">
            <NextLink href="/shops/123/artists/123" passHref>
              <a>
                <Stack direction="row" align="center" bg="paleGray" p="2">
                  <Box width="50px">
                    <AspectRatio ratio={1}>
                      <Image
                        src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"
                        borderRadius="5px"
                      ></Image>
                    </AspectRatio>
                  </Box>
                  <Box>
                    <Text fontSize="xs">作者情報</Text>
                    <Text
                      fontWeight="700"
                      fontSize="xs"
                      maxHeight="2.8em"
                      overflow="hidden"
                    >
                      ティンカー・ハットフィールド
                    </Text>
                  </Box>
                </Stack>
              </a>
            </NextLink>
          </Box>

          <Box pt="5">
            <NextLink href="/shops/123" passHref>
              <a>
                <Stack
                  direction="row"
                  align="center"
                  bg="paleGray"
                  p="2"
                  className="ftHover"
                >
                  <Box width="50px">
                    <AspectRatio ratio={1}>
                      <Image
                        src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"
                        borderRadius="5px"
                      ></Image>
                    </AspectRatio>
                  </Box>
                  <Box>
                    <Text fontSize="xs">販売ショップ</Text>
                    <Text
                      fontWeight="700"
                      fontSize="xs"
                      maxHeight="2.8em"
                      overflow="hidden"
                    >
                      芝浦Football World Garally
                    </Text>
                  </Box>
                </Stack>
              </a>
            </NextLink>
          </Box>
        </Box>
      </HStack>

      <Box width="600px" mx="auto" p="10">
        <Text fontSize="sm">
          ミッドソールに開けたウインドウから適度な圧が解放されるようになり、エアバッグにより多量のエアを充填できることとなった。
          <br />
          このことから、エアマックスに搭載されているエアバッグは「マキシマムエア」や「マックスエア」と呼称されることとなる。
          <br />
          この「エアマックス」という製品名に関してかなり厳格であり、舗装路用ランニングシューズでビジブルエア搭載かつ最大容量のエア搭載の最上位モデルにその名が冠せられることとなった。ただしこのネーミングに関しては、当時からエア・スタブやエア180、エアクラシックBWなどの例外も存在し、エアマックスCB34やエアノモマックスなどランニングシューズ以外にも適応されるようになっている。
          また現在では、最上位モデルのシューズでない所謂廉価版シューズであってもエアマックスと冠するシューズが存在するなど、その呼称に関しては当時ほど厳格ではない。
        </Text>

        {[...Array(3)].map((_, index) => {
          return (
            <Box pt="5" key={index}>
              <Link>
                <Stack
                  direction="row"
                  align="start"
                  bg="paleGray"
                  border={1}
                  borderColor="lightGray"
                >
                  <Box w="20%">
                    <AspectRatio ratio={1}>
                      <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
                    </AspectRatio>
                  </Box>
                  <Box w="80%" p="5">
                    <Text fontSize="sm" noOfLines={3}>
                      この「エアマックス」という製品名に関してかなり厳格であり、舗装路用ランニングシューズでビジブルエア搭載かつ最大容量のエア搭載の最上位モデルにその名が冠せられることとなった。ただしこのネーミングに関しては、当時からエア・スタブやエア180、エアクラシックBWなどの例外も存在し、エアマックスC
                    </Text>
                  </Box>
                </Stack>
              </Link>
            </Box>
          );
        })}
      </Box>
      {/* dialog */}
      <DialogPostBidding ref={dialogPostBidding}></DialogPostBidding>
    </>
  );
};

export default ItemShow;
