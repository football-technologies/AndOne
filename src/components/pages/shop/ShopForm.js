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
  AspectRatio,
} from "@chakra-ui/react";

import useFtToast from "@/components/ui/FtToast";
import {
  FtSmallButtonOutlined,
  FtMiddleButtonOutlined,
  FtLargeButton,
} from "@/components/ui/FtButton";
import { ftCreateId } from "@/plugins/mixin";
import { createShop, fetchShop, updateShop } from "@/store/shop";
import { updateUser } from "@/store/user";
import { createTag } from "@/store/tag";
import { updateAccount } from "@/store/account";

import { UploadIcon, UploadMain } from "@/components/ui/ImageUpload";

import { db } from "@/plugins/firebase";
import { doc, query, collection, getDocs, where } from "firebase/firestore";

import _ from "lodash";
import rules from "@/plugins/validation";
import scheme from "@/helpers/scheme";

import SubImagesForm from "@/components/pages/shop/SubImagesForm";

const ShopForm = () => {
  const [iconUrl, setIconUrl] = useState(null);
  const [mainUrl, setMainUrl] = useState(null);
  const [submitType, setSubmitType] = useState(null);
  const [editShop, setEditShop] = useState(null);
  const [tags, setTags] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state) => state.account);
  const bindShop = useSelector((state) => state.shop.shop);

  const dispatch = useDispatch();
  const { ftToast } = useFtToast();
  const router = useRouter();

  const iconRef = useRef();
  const mainRef = useRef();
  const subRefs = useRef([]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.shopId) {
        dispatch(
          fetchShop({
            query: `shops/${router.query.shopId}`,
            type: "fetch",
          })
        );

        return () => {
          dispatch(
            fetchShop({
              query: `shops/${router.query.shopId}`,
              type: "delete",
            })
          );
        };
      } else {
        const shop = _.cloneDeep(scheme.shops);
        shop.id = ftCreateId("shop");
        setEditShop(shop);
        setSubmitType("create");

        return () => {
          setEditShop(null);
          setSubmitType(null);
          setTags(null);
        };
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindShop) {
      const shop = _.cloneDeep(bindShop);

      if (shop.tags.length > 0) {
        const tagNames = [];
        for (const tag of shop.tags) {
          tagNames.push(tag.name);
        }
        const tags = tagNames.join();
        setTags(tags);
      }

      setSubmitType("update");
      setEditShop(shop);
    }

    return () => {
      setEditShop(null);
      setSubmitType(null);
      setTags(null);
    };
  }, [bindShop]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const createTags = async (tagNames) => {
    const newTags = [];
    for (const tagName of tagNames) {
      const sameNameTags = [];

      const q = query(collection(db, "tags"), where("name", "==", tagName));
      await getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id) {
            sameNameTags.push(doc.data());
          }
        });
      });

      let tagId = null;
      if (sameNameTags.length === 0) {
        const editTag = _.cloneDeep(scheme.tags);
        editTag.id = ftCreateId("tag");
        editTag.name = tagName;
        dispatch(createTag(editTag));
        tagId = editTag.id;
      } else {
        const sameNameTag = sameNameTags[0];
        tagId = sameNameTag.id;
      }

      const tagToSaveShopsCollection = {
        id: tagId,
        ref: doc(db, `tags/${tagId.id}`),
        name: tagName,
      };
      newTags.push(tagToSaveShopsCollection);
    }

    editShop.tags = newTags;
    // TODO: master_tagのdelate関連は、shop.onUpdateで実施
  };

  const returnImages = (images) => {
    editShop.images = images;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (tags) {
      const replaceTagsName = tags
        .replaceAll(" ", "")
        .replaceAll("　", "")
        .replaceAll("、", ",")
        .split(",");

      const tagsDividedByComma = _.uniq(replaceTagsName);

      if (tagsDividedByComma.length > 10) {
        ftToast("タグは10個以上設定することができません");
        setIsLoading(false);
        return false;
      }

      await createTags(tagsDividedByComma);
    }

    if (mainUrl) {
      editShop.cover = mainUrl;
    }

    if (iconUrl) {
      editShop.icon = iconUrl;
    }

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

    if (submitType === "create") {
      editShop.id = editShop.id;
      dispatch(
        updateAccount({
          id: currentUser.id,
          authId: currentUser.authId,
          email: currentUser.email,
          name: currentUser.name,
          icon: currentUser.icon,
          shopId: editShop.id,
        })
      );
      dispatch(
        updateUser({
          id: currentUser.id,
          shop: {
            id: editShop.id,
            ref: doc(db, "shops", editShop.id),
          },
        })
      );
      dispatch(createShop(editShop));
      ftToast("shopが作成されました");
    }

    if (submitType === "update") {
      dispatch(updateShop(editShop));
      ftToast("shopを更新しました");
    }

    console.log(">>>>>>>>> finish submit");
    router.push(`/shops/${editShop.id}`);
    // setIsLoading(false);
  };

  if (editShop) {
    const snsLinks = Object.entries(editShop.links);

    const images = [];
    editShop.images.length > 0
      ? (images = editShop.images)
      : (images = [...Array(9)]);

    return (
      <>
        <HStack bg={"lightGray"} position="relative" overflow="hidden">
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="5000px"
            zIndex="2"
            bg="blackAlpha.300"
          ></Box>

          <Box position="absolute" top="40%" right="40%" zIndex="3">
            <FtMiddleButtonOutlined
              borderColor="white"
              color="white"
              onClick={openMainRef}
            >
              Cover画像を変更する
            </FtMiddleButtonOutlined>
          </Box>

          <AspectRatio w={"100%"} h={"auto"} ratio={2.5}>
            <Image
              src={
                mainUrl
                  ? mainUrl
                  : editShop.cover
                  ? editShop.cover
                  : "https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
              }
            ></Image>
          </AspectRatio>

          <UploadMain
            ref={mainRef}
            folderPath={`shops/${editShop.id}/main`}
            uploadMain={uploadMain}
          ></UploadMain>
        </HStack>

        <HStack mt="50px" align="top">
          <Stack w="25%">
            <VStack>
              <Text mb={"15px"}>Shop Icon</Text>
              <Box>
                <Image
                  boxSize="120px"
                  rounded="full"
                  border="1px"
                  borderColor="paleGray"
                  src={
                    iconUrl
                      ? iconUrl
                      : editShop.icon
                      ? editShop.icon
                      : "https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
                  }
                ></Image>
              </Box>
              <Box>
                <VStack mb={"50px"}>
                  <UploadIcon
                    ref={iconRef}
                    folderPath={`shops/${editShop.id}/icon`}
                    uploadIcon={uploadIcon}
                  ></UploadIcon>
                  <FtSmallButtonOutlined onClick={openIconRef}>
                    iconを変更する
                  </FtSmallButtonOutlined>
                </VStack>
              </Box>
            </VStack>

            <VStack>
              <Text>Tags</Text>
              <Textarea
                w={"80%"}
                height="8em"
                variant={"filled"}
                onChange={onChangeSetTags}
                defaultValue={tags}
                placeholder="例） 2011,英国,サッカー,football"
              ></Textarea>
              <Text w={"80%"} fontSize="sm">
                カンマを入れて、最大10個まで作成するこができます。
              </Text>
            </VStack>
          </Stack>

          <Stack w="45%" px="10">
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.shopName}>
                  <FormLabel>Shop Name</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="芝浦World Football Gallery"
                    defaultValue={editShop.name}
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
                    defaultValue={editShop.delegate}
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
                    height="10em"
                    placeholder="bio"
                    defaultValue={editShop.description}
                    {...register("description")}
                  ></Textarea>
                </FormControl>

                <FormControl mt={"10px"}>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    variant="filled"
                    height="2em"
                    placeholder="東京都港区芝浦1-11-1"
                    defaultValue={editShop.address}
                    {...register("address")}
                  ></Textarea>
                </FormControl>

                <FormControl isInvalid={errors.phone} mt={"10px"}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="090-1111-1111"
                    defaultValue={editShop.phone}
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
                    variant="filled"
                    placeholder="shop@apple.com"
                    defaultValue={editShop.email}
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
                    defaultValue={editShop.openHour}
                    {...register("openHour")}
                  />
                </FormControl>

                <FormControl mt={"10px"}>
                  <FormLabel>Holidays</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="月曜日"
                    defaultValue={editShop.holidays}
                    {...register("holidays")}
                  />
                </FormControl>

                <Text mt={"10px"}>Links</Text>
                <Stack align={"end"}>
                  {snsLinks.map((sns, index) => (
                    <FormControl key={index} mt={"10px"} w={"90%"}>
                      <FormLabel>{sns[0]}</FormLabel>
                      <Input
                        variant="filled"
                        placeholder={`https://${sns[0]}.com/shibauraG2913`}
                        defaultValue={sns[1]}
                        {...register(sns[0])}
                      />
                    </FormControl>
                  ))}
                </Stack>

                <VStack my="10">
                  <FtLargeButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText=" Submitting..."
                  >
                    {submitType === "create" ? "作成する" : "更新する"}
                  </FtLargeButton>
                </VStack>
              </form>
            </Box>
          </Stack>

          <Stack w={"30%"}>
            <SubImagesForm
              images={editShop.images}
              returnImages={returnImages}
            ></SubImagesForm>
            <Text fontSize="sm">お店の紹介画像は最大で9枚まで表示できます</Text>
          </Stack>
        </HStack>
      </>
    );
  }
};

export default ShopForm;
