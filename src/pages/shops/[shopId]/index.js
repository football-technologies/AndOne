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
  Circle,
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

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchShop } from "@/store/shop";

import DialogImage from "@/components/pages/shop/DialogImage";
import { useRef } from "react";
import { FtMiddleButton } from "@/components/ui/FtButton";

const ShopShow = () => {
  const dispatch = useDispatch();
  const dialogImage = useRef();
  const router = useRouter();

  const { shopId } = router.query;

  const bindShop = useSelector((state) => state.shop.shop);

  const outerLinks = [
    {
      name: "homepage",
      icon: FaDesktop,
    },
    {
      name: "twitter",
      icon: FaTwitter,
    },
    {
      name: "instagram",
      icon: FaInstagram,
    },
    {
      name: "facebook",
      icon: FaFacebook,
    },
    {
      name: "tiktok",
      icon: FaTiktok,
    },
    {
      name: "others",
      icon: FaGlobe,
    },
  ];

  const openDialogImage = (index) => {
    dialogImage.current.openDialog({
      images: bindShop.images.filter((img) => img.url),
      index: index,
    });
  };

  useEffect(() => {
    console.log(">>>>>>>>> called useEffect");
    if (router.isReady) {
      console.log(router.query);
      dispatch(
        fetchShop({
          query: `shops/${shopId}`,
          type: "fetch",
        })
      );
    }
  }, [router.isReady]);

  return (
    <>
      {bindShop && (
        <>
          <Box className="HeroContainer" pos="relative">
            <AspectRatio ratio={16 / 9}>
              <Image src={bindShop.cover}></Image>
            </AspectRatio>

            <Box pos="absolute" top="0" right="0" zIndex="10">
              <Menu>
                <MenuButton className="ftHover">
                  <Circle
                    size="50px"
                    bg="whiteAlpha.500"
                    border="1px"
                    borderColor="lightGray"
                    _hover={{ bg: "red" }}
                  >
                    <Icon boxSize="2em" as={MdOutlineMoreVert}></Icon>
                  </Circle>
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
                        <Text fontSize="sm">アイテムを作成</Text>
                      </a>
                    </NextLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>

          <HStack align="start" p="5" className="mainContainer">
            <Stack w="20%" className="tagsBlock">
              {bindShop.tags.map((tag) => {
                return (
                  <NextLink href={`/tags/${tag.id}`} passHref key={tag.id}>
                    <Button size="sm" variant="link" as="a">
                      #{tag.name}
                    </Button>
                  </NextLink>
                );
              })}
            </Stack>

            <Stack w="60%" px="5" className="textBlock">
              <Stack direction="row">
                <Box>
                  {outerLinks
                    .filter((eachLink) => bindShop.links[eachLink.name])
                    .map((link) => {
                      return (
                        <Link
                          href={bindShop.links[link.name]}
                          isExternal
                          p="1"
                          key={link.name}
                        >
                          <Icon as={link.icon}></Icon>
                        </Link>
                      );
                    })}
                </Box>
              </Stack>

              <Heading as="h1">{bindShop.name}</Heading>

              <Text fontSize="sm" py="10">
                {bindShop.description}
              </Text>

              <Box bg="paleGray" p="5">
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  borderBottom="1px"
                  borderColor="white"
                >
                  <Icon as={FaMapMarked} boxSize="1em" mr="2"></Icon>
                  {bindShop.address}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  borderBottom="1px"
                  borderColor="white"
                  pt="3"
                >
                  <Icon as={FaPhone} boxSize="1em" mr="2"></Icon>
                  {bindShop.phone}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  borderBottom="1px"
                  borderColor="white"
                  pt="3"
                >
                  <Icon as={MdMail} boxSize="1em" mr="2"></Icon>
                  {bindShop.email}
                </Text>

                <Text
                  fontSize="xs"
                  fontWeight="700"
                  borderBottom="1px"
                  borderColor="white"
                  pt="3"
                >
                  <Icon as={FaBookOpen} boxSize="1em" mr="2"></Icon>
                  営業時間： {bindShop.openHour}
                  、定休：{bindShop.holidays}
                </Text>
              </Box>
            </Stack>

            <Stack w="20%" className="imagesBlock">
              <Wrap spacing="0">
                {bindShop.images
                  .filter((image) => image.url)
                  .map((img, index) => {
                    return (
                      <>
                        <Box
                          w="31%"
                          p="1%"
                          key={index}
                          onClick={() => openDialogImage(index)}
                        >
                          <AspectRatio ratio={1}>
                            <Image
                              rounded="md"
                              src={img.url}
                              className="ftHover"
                            ></Image>
                          </AspectRatio>
                        </Box>
                      </>
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
                {[...Array(10)].map((_, index) => {
                  return (
                    <Stack isInline w="23%" p="1%" key={index}>
                      <ItemMiddleCard></ItemMiddleCard>
                    </Stack>
                  );
                })}
              </Wrap>
            </Box>
          </Stack>
        </>
      )}
      {/* dialog */}
      <DialogImage ref={dialogImage}></DialogImage>
    </>
  );
};

export default ShopShow;
