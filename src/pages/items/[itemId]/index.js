import { FtButton, FtButtonOutlinedSmall } from "@/components/ui/FtButton";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const ItemShow = () => {
  const router = useRouter();
  const { itemId } = router.query;

  console.log(">>>>>>>> itemId", itemId);

  return (
    <>
      <HStack align="start">
        <Stack width="70%">
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
        </Stack>

        <Stack width="30%" p="5">
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

          <Center pt="5">
            <FtButton>入札する</FtButton>
          </Center>

          <Tag size="sm" variant="outline">
            作成年：2012年
          </Tag>

          <Box>
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

          <Box bg="paleGray" p="2" mt="5">
            <Link href="/">
              <Stack direction="row" align="center">
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
            </Link>
          </Box>

          <Box bg="paleGray" p="2" mt="5">
            <Link href="/">
              <Stack direction="row" align="center">
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
            </Link>
          </Box>
        </Stack>
      </HStack>

      <Stack width="500px" mx="auto">
        <Text fontSize="xs" pt="5">
          ミッドソールに開けたウインドウから適度な圧が解放されるようになり、エアバッグにより多量のエアを充填できることとなった。このことから、エアマックスに搭載されているエアバッグは「マキシマムエア」や「マックスエア」と呼称されることとなる。この「エアマックス」という製品名に関してかなり厳格であり、舗装路用ランニングシューズでビジブルエア搭載かつ最大容量のエア搭載の最上位モデルにその名が冠せられることとなった。ただしこのネーミングに関しては、当時からエア・スタブやエア180、エアクラシックBWなどの例外も存在し、エアマックスCB34やエアノモマックスなどランニングシューズ以外にも適応されるようになっている。また現在では、最上位モデルのシューズでない所謂廉価版シューズであってもエアマックスと冠するシューズが存在するなど、その呼称に関しては当時ほど厳格ではない。
        </Text>
      </Stack>
    </>
  );
};

export default ItemShow;
