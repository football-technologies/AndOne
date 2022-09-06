import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Wrap,
  Heading,
  Link,
  Text,
  Tabs,
  TabList,
  Tab,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  FaBookOpen,
  FaDesktop,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaMapMarked,
  FaPhone,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { MdMail, MdOutlineMoreVert } from "react-icons/md";

import { useRouter } from "next/router";
import NextLink from "next/link";
import ItemMiddleCard from "@/components/cards/ItemMiddleCard";

const ShopShow = () => {
  const router = useRouter();
  const { shopId } = router.query;

  console.log(">>>>>>>> shopId", shopId);

  const relative = {
    position: "relative",
  };

  const absolute = {
    position: "absolute",
    top: "25px",
    right: "25px",
  };

  const icon = {
    fill: "white",
  };

  return (
    <>
      <Box style={relative}>
        <AspectRatio ratio={16 / 9}>
          <Image src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"></Image>
        </AspectRatio>

        <Menu>
          <MenuButton style={absolute} className="ftHover">
            <Icon style={icon} as={MdOutlineMoreVert} w={10} h={10}></Icon>
          </MenuButton>
          <MenuList>
            <MenuItem p="5">
              <NextLink href={`/shops/${shopId}/edit`} passHref>
                <a>
                  <Text fontSize="sm">ショップを編集</Text>
                </a>
              </NextLink>
            </MenuItem>
            <MenuDivider />
            <MenuItem p="5">
              <NextLink href="/items/new" passHref>
                <a>
                  <Text fontSize="sm">アイテムを登録</Text>
                </a>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <HStack align="start" p="5" className="mainContainer">
        <Stack w="20%" className="tagsBlock">
          <NextLink href="/tags/123" passHref>
            <Button size="sm" variant="link" as="a">
              #英国
            </Button>
          </NextLink>
          <NextLink href="/tags/123" passHref>
            <Button size="sm" variant="link" as="a">
              #2012
            </Button>
          </NextLink>
          <NextLink href="/tags/123" passHref>
            <Button size="sm" variant="link" as="a">
              #football
            </Button>
          </NextLink>
          <NextLink href="/tags/123" passHref>
            <Button size="sm" variant="link" as="a">
              #サッカー
            </Button>
          </NextLink>
          <NextLink href="/tags/123" passHref>
            <Button size="sm" variant="link" as="a">
              #ユニフォーム
            </Button>
          </NextLink>
          <NextLink href="/tags/123" passHref>
            <Button size="sm" variant="link" as="a">
              #uniform
            </Button>
          </NextLink>
        </Stack>

        <Stack w="60%" px="5" className="textBlock">
          <Stack direction="row">
            <Box>
              <Link href="https://google.com" isExternal p="1">
                <Icon as={FaDesktop}></Icon>
              </Link>
              <Link href="https://google.com" isExternal p="1">
                <Icon as={FaFacebook}></Icon>
              </Link>
              <Link href="https://google.com" isExternal p="1">
                <Icon as={FaInstagram}></Icon>
              </Link>
              <Link href="https://google.com" isExternal p="1">
                <Icon as={FaTiktok}></Icon>
              </Link>
              <Link href="https://google.com" isExternal p="1">
                <Icon as={FaTwitter}></Icon>
              </Link>
              <Link href="https://google.com" isExternal p="1">
                <Icon as={FaGlobe}></Icon>
              </Link>
            </Box>
          </Stack>

          <Heading as="h1">芝浦Football Garally</Heading>

          <Text fontSize="sm" py="10">
            ミッドソールに開けたウインドウから適度な圧が解放されるようになり、エアバッグにより多量のエアを充填できることとなった。
            このことから、エアマックスに搭載されているエアバッグは「マキシマムエア」や「マックスエア」と呼称されることとなる。
            この「エアマックス」という製品名に関してかなり厳格であり、舗装路用ランニングシューズでビジブルエア搭載かつ最大容量のエア搭載の最上位モデルにその名が冠せられることとなった。ただしこのネーミングに関しては、当時からエア・スタブやエア180、エアクラシックBWなどの例外も存在し、エアマックスCB34やエアノモマックスなどランニングシューズ以外にも適応されるようになっている。
            また現在では、最上位モデルのシューズでない所謂廉価版シューズであってもエアマックスと冠するシューズが存在するなど、その呼称に関しては当時ほど厳格ではない。
          </Text>

          <Box bg="paleGray" p="5">
            <Text
              fontSize="xs"
              fontWeight="700"
              borderBottom="1px"
              borderColor="white"
            >
              <Icon as={FaMapMarked} size="xl" mr="2"></Icon>
              東京都港区芝浦1-12-3
            </Text>
            <Text
              fontSize="xs"
              fontWeight="700"
              borderBottom="1px"
              borderColor="white"
              pt="3"
            >
              <Icon as={FaPhone} size="xl" mr="2"></Icon>
              03-1234-5678
            </Text>
            <Text
              fontSize="xs"
              fontWeight="700"
              borderBottom="1px"
              borderColor="white"
              pt="3"
            >
              <Icon as={MdMail} size="xl" mr="2"></Icon>
              contact@football.com
            </Text>

            <Text
              fontSize="xs"
              fontWeight="700"
              borderBottom="1px"
              borderColor="white"
              pt="3"
            >
              <Icon as={FaBookOpen} size="xl" mr="2"></Icon>
              営業時間：10:00〜20:00、定休：月曜日
            </Text>
          </Box>
        </Stack>

        <Stack w="20%" className="imagesBlock">
          <Wrap spacing="0">
            {[...Array(9)].map((_) => {
              return (
                <Box w="31%" p="1%">
                  <AspectRatio ratio={1}>
                    <Image
                      rounded="md"
                      src="https://images.unsplash.com/photo-1557346817-0fa9ee43e5ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="ftHover"
                    ></Image>
                  </AspectRatio>
                </Box>
              );
            })}
          </Wrap>
        </Stack>
      </HStack>

      <Stack className="itemsBlock">
        <Box w="600px" mx="auto" pt="10" mt="10">
          <Tabs isFitted colorScheme="primary">
            <TabList>
              <Tab>All (823)</Tab>
              <Tab>On Sale (323)</Tab>
              <Tab>Sold (513)</Tab>
            </TabList>
          </Tabs>
        </Box>

        <Box pt="5">
          <Wrap p="5">
            {[...Array(10)].map((_) => {
              return (
                <Stack isInline w="23%" p="1%">
                  <ItemMiddleCard></ItemMiddleCard>
                </Stack>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
    </>
  );
};

export default ShopShow;
