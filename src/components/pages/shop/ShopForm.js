import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
  Box,
  Input,
  VStack,
  Textarea,
  HStack,
  Stack,
  Text,
  Image,
  Wrap,
  WrapItem,
  AspectRatio,
} from "@chakra-ui/react";

import useFtToast from "@/components/ui/FtToast";
import { FtMiddleButtonOutlined } from "@/components/ui/FtButton";
import { ftCreateId } from "@/plugins/mixin";
import { createShop } from "@/store/shop";
import { updateUser } from "@/store/user";
import { createTag } from "@/store/tag";
import { updateAccount } from "@/store/account";

import { UploadIcon, UploadMain } from "@/components/ui/ImageUpload";

import { db } from "@/plugins/firebase";
import { doc } from "firebase/firestore";

import _ from "lodash";
import rules from "@/plugins/validation";
import scheme from "@/helpers/scheme";

const ShopForm = () => {
  const [iconUrl, setIconUrl] = useState(null);
  const [mainUrl, setMainUrl] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [editShop, setEditShop] = useState(null);
  const [tags, setTags] = useState(null);

  const dispatch = useDispatch();
  const { ftToast } = useFtToast();
  const router = useRouter();
  const iconRef = useRef();
  const mainRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const currentUser = useSelector((state) => state.account);

  useEffect(() => {
    const shopId = ftCreateId("shop");
    setShopId(shopId);

    const shop = _.cloneDeep(scheme.shops);
    setEditShop(shop);

    return () => {
      setShopId(null);
      setEditShop(null);
    };
  }, []);

  const snsList = [
    { id: 1, name: "Twitter", type: "twitter" },
    { id: 2, name: "Facebook", type: "facebook" },
    { id: 3, name: "Instagram", type: "instagram" },
    { id: 4, name: "Tiktok", type: "tiktok" },
    { id: 5, name: "Homepage", type: "homepage" },
    { id: 6, name: "Blogs", type: "blogs" },
    { id: 7, name: "Others", type: "others" },
  ];

  const openIconRef = () => {
    iconRef.current.click();
  };

  const openMainRef = () => {
    mainRef.current.click();
  };

  const uploadIcon = (url) => {
    console.log(">>>>>>>>>>>>> return icon URL", url);
    setIconUrl(url);
  };

  const uploadMain = (url) => {
    console.log(">>>>>>>>>>>>> return main URL", url);
    setMainUrl(url);
  };

  const onChangeSetTags = (e) => {
    setTags(e.target.value);
  };

  const createTags = (tags) => {
    for (const tag of tags) {
      const tagId = ftCreateId("tag");
      const editTag = _.cloneDeep(scheme.tags);

      editTag.id = tagId;
      editTag.name = tag;

      const tagToSaveShopsCollection = {
        id: tagId,
        ref: doc(db, "tags", tagId),
        name: tag,
      };

      editShop.tags.push(tagToSaveShopsCollection);

      dispatch(createTag(editTag));
    }
  };

  const onSubmit = (data) => {
    if (tags) {
      const tagsDividedByComma = tags.split(",");

      if (tagsDividedByComma.length > 10) {
        ftToast("タグは10個以上設定することができません");
        return false;
      } else {
        createTags(tagsDividedByComma);
      }
    }

    editShop.id = shopId;
    editShop.name = data.shopName;
    editShop.address = data.address;
    editShop.email = data.email;
    editShop.description = data.description;
    editShop.delegate = data.originalUrl;
    editShop.phone = data.phone;
    editShop.openHour = data.openHour;
    editShop.holidays = data.holidays;
    editShop.links.twitter = data.twitter;
    editShop.links.instagram = data.instagram;
    editShop.links.facebook = data.facebook;
    editShop.links.tiktok = data.tiktok;
    editShop.links.blogs = data.blogs;
    editShop.links.homepage = data.homepage;
    editShop.links.others = data.others;

    dispatch(
      updateUser({
        id: currentUser.id,
        shop: {
          id: shopId,
          ref: doc(db, "shops", shopId),
        },
      })
    );

    dispatch(
      updateAccount({
        id: currentUser.id,
        authId: currentUser.authId,
        email: currentUser.email,
        name: currentUser.name,
        icon: currentUser.icon,
        shopId: shopId,
      })
    );

    dispatch(createShop(editShop));
    ftToast("shopが作成されました");
    router.push("/");
  };

  return (
    <>
      <HStack bg={"lightGray"} className="ftHover" onClick={openMainRef}>
        {mainUrl ? (
          <AspectRatio w={"100%"} h={"auto"} ratio={2.5}>
            <Image src={mainUrl}></Image>
          </AspectRatio>
        ) : (
          <AspectRatio w={"100%"} h={"auto"} ratio={2.5}>
            <Image src="https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"></Image>
          </AspectRatio>
        )}
        <UploadMain
          ref={mainRef}
          folderPath={`shops/${shopId}/main`}
          uploadMain={uploadMain}
        ></UploadMain>
      </HStack>
      <HStack mt={"50px"}>
        <Stack w={"30%"} h={"220vh"}>
          <VStack>
            <Text mb={"15px"}>Shop Icon Image</Text>
            <Box>
              {iconUrl ? (
                <Image src={iconUrl} boxSize={"120px"} rounded={"xl"}></Image>
              ) : (
                <Image
                  boxSize={"120px"}
                  rounded={"xl"}
                  src="https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
                ></Image>
              )}
            </Box>
            <Box>
              <VStack mb={"50px"}>
                <UploadIcon
                  ref={iconRef}
                  folderPath={`shops/${shopId}/icon`}
                  uploadIcon={uploadIcon}
                ></UploadIcon>
                <FtMiddleButtonOutlined onClick={openIconRef}>
                  iconを変更する
                </FtMiddleButtonOutlined>
              </VStack>
            </Box>
          </VStack>
          <VStack>
            <Text>Tags</Text>
            <Textarea
              w={"80%"}
              variant={"filled"}
              onChange={onChangeSetTags}
            ></Textarea>
            <Text w={"80%"}>
              カンマを入れて、最大10個まで作成するこができます。
            </Text>
          </VStack>
        </Stack>
        <Stack w={"40%"} h={"220vh"}>
          <VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.shopName}>
                <FormLabel>Shop Name</FormLabel>
                <Input
                  variant="filled"
                  placeholder="芝浦World Football Gallery"
                  // defaultValue={editShop?.name}
                  {...register("shopName", {
                    required: "お店の名前は必須入力です",
                  })}
                />
                <FormErrorMessage>
                  {errors.shopName && errors.shopName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.originalUrl} mt={"10px"}>
                <FormLabel>Original URL</FormLabel>
                <Input
                  variant="filled"
                  placeholder="shibaura-world-football-gallery"
                  {...register("originalUrl", {
                    pattern: rules.url,
                  })}
                />
                <FormHelperText>
                  AndOneであなたのShopのURLになります
                  <br />
                  英数字 - のみがご利用できます
                </FormHelperText>
                <FormErrorMessage>
                  {errors.originalUrl && errors.originalUrl.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={"10px"}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  variant="filled"
                  placeholder="bio"
                  {...register("description")}
                ></Textarea>
              </FormControl>

              <FormControl mt={"10px"}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  variant="filled"
                  placeholder="東京都港区芝浦1-11-1"
                  {...register("address")}
                ></Textarea>
              </FormControl>

              <FormControl isInvalid={errors.phone} mt={"10px"}>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="phone"
                  variant="filled"
                  placeholder="090-1111-1111"
                  {...register("phone", {
                    pattern: rules.phone,
                  })}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email} mt={"10px"}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  placeholder="shop@apple.com"
                  {...register("email", {
                    pattern: rules.email,
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={"10px"}>
                <FormLabel>Open Hour</FormLabel>
                <Input
                  variant="filled"
                  placeholder="10時 - 20時"
                  {...register("openHour")}
                />
              </FormControl>

              <FormControl mt={"10px"}>
                <FormLabel>Holidays</FormLabel>
                <Input
                  variant="filled"
                  placeholder="月曜日"
                  {...register("holidays")}
                />
              </FormControl>

              <Text mt={"10px"}>Links</Text>
              <Stack align={"end"}>
                {snsList.map((sns) => (
                  <FormControl key={sns.id} mt={"10px"} w={"90%"}>
                    <FormLabel>{sns.name}</FormLabel>
                    <Input
                      type={sns.type}
                      variant="filled"
                      placeholder={`https://${sns.type}.com/shibauraG2913`}
                      {...register(sns.type)}
                    />
                  </FormControl>
                ))}
              </Stack>

              <VStack mt={"20px"}>
                <Button colorScheme="pink" type="submit" mt={"20px"}>
                  作成する
                </Button>
              </VStack>
            </form>
          </VStack>
        </Stack>
        <Stack w={"30%"} h={"220vh"}>
          <VStack mt={"30px"}>
            <Wrap>
              {[...Array(9)].map((_) => {
                return (
                  <WrapItem>
                    <Image
                      boxSize={"60px"}
                      rounded={"xl"}
                      src="https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
                    ></Image>
                  </WrapItem>
                );
              })}
            </Wrap>
            <Text>お店の紹介画像は最大で9枚まで表示できます</Text>
          </VStack>
        </Stack>
      </HStack>
    </>
  );
};

export default ShopForm;
