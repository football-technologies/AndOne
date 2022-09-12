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
  Avatar,
  Center,
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
import { MdMail } from "react-icons/md";

import { useRouter } from "next/router";
import NextLink from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchShop } from "@/store/shop";

import DialogImage from "@/components/pages/shop/DialogImage";
import { useRef } from "react";
import LikeButton from "@/components/ui/LikeButton";

import ShopMenu from "@/components/pages/shop/ShopMenu";
import MyShopItemsList from "@/components/pages/shop/MyShopItemsList";

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
      images: bindShop.images,
      index: index,
    });
  };

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
      dispatch(
        fetchShop({
          query: `shops/${shopId}`,
          isOnSnapshot: true,
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

            <ShopMenu shopId={bindShop.id}></ShopMenu>
          </Box>

          <HStack align="start" p="5" className="mainContainer">
            <Stack w="20%" className="tagsBlock">
              <Center>
                <Avatar
                  src={bindShop.icon}
                  name={bindShop.name}
                  size="xl"
                  border="1px"
                  borderColor="paleGray"
                  style={{ marginTop: "-70px" }}
                  mb="10"
                ></Avatar>
              </Center>

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

              <Heading as="h1">
                {bindShop.name}{" "}
                <LikeButton
                  target="shop"
                  id={shopId}
                  name={bindShop.name}
                ></LikeButton>
              </Heading>

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
                {bindShop.images.map((img, index) => {
                  return (
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
                  );
                })}
              </Wrap>
            </Stack>
          </HStack>

          <Stack className="itemsBlock">
            <MyShopItemsList shopId={bindShop.id}></MyShopItemsList>
          </Stack>
        </>
      )}
      {/* dialog */}
      <DialogImage ref={dialogImage}></DialogImage>
    </>
  );
};

export default ShopShow;
