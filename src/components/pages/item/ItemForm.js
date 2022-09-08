import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef, createRef } from "react";
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
import { createItem, fetchItem, updateItem } from "@/store/item";
import { createArtist } from "@/store/artist";
import { createTag, deleteTag } from "@/store/tag";
import { UploadIcon } from "@/components/ui/ImageUpload";
import SubImagesForm from "@/components/pages/shop/SubImagesForm";

import { fetchShop } from "@/store/shop";
import { fetchArtist } from "@/store/artist";

import { db } from "@/plugins/firebase";
import { doc, query, getDocs, collection, where } from "firebase/firestore";

import _ from "lodash";
import scheme from "@/helpers/scheme";

const ItemForm = () => {
  const [iconUrl, setIconUrl] = useState(null);
  const [submitType, setSubmitType] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editArtist, setEditArtist] = useState(null);

  const currentUser = useSelector((state) => state.account);
  const bindItem = useSelector((state) => state.item.item);
  const bindArtist = useSelector((state) => state.artist.artist);
  const bindShop = useSelector((state) => state.shop.shop);

  const router = useRouter();
  const dispatch = useDispatch();

  const iconRef = useRef();

  const { ftToast } = useFtToast();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.itemId) {
        dispatch(
          fetchItem({
            query: `items/${router.query.itemId}`,
            type: "fetch",
          })
        );

        return () => {
          dispatch(
            fetchItem({
              query: `items/${router.query.itemId}`,
              type: "delete",
            })
          );
        };
      } else {
        const item = _.cloneDeep(scheme.items);
        item.id = ftCreateId("item");

        // const artist = _.cloneDeep(scheme.artists);
        // item.artist.id = artist.id = ftCreateId("artist");

        setEditItem(item);
        // setEditArtist(artist);
        setSubmitType("create");

        return () => {
          setEditItem(null);
          setSubmitType(null);
        };
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindItem) {
      const item = _.cloneDeep(bindItem);

      if (item.tags.length > 0) {
        const tagNames = [];
        for (const tag of item.tags) {
          tagNames.push(tag.name);
        }
        const tags = tagNames.join();
        item.tags = tags;
      }

      setSubmitType("update");
      setEditItem(item);

      dispatch(
        fetchArtist({
          query: `artists/${item.artist.id}`,
          type: "fetch",
        })
      );
    }

    return () => {
      setEditItem(null);
      setSubmitType(null);
    };
  }, [bindItem]);

  // useEffect(() => {
  //   if (bindArtist) {
  //     const artist = _.cloneDeep(bindArtist);
  //     setEditArtist(artist);
  //   }

  //   return () => {
  //     dispatch(
  //       fetchArtist({
  //         query: `artists/${artist.id}`,
  //         type: "delete",
  //       })
  //     );
  //   };
  // }, [bindArtist]);

  useEffect(() => {
    dispatch(
      fetchShop({
        query: `shops/${currentUser.shopId}`,
        type: "fetch",
      })
    );

    return () => {
      dispatch(
        fetchShop({
          query: `shops/${currentUser.shopId}`,
          type: "delete",
        })
      );
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const openIconRef = () => {
    iconRef.current.click();
  };

  const uploadIcon = (url) => {
    console.log(">>>>>>>>>>>>> return icon URL", url);
    setIconUrl(url);
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

      const tagToSaveItemsCollection = {
        id: tagId,
        ref: doc(db, `tags/${tagId.id}`),
        name: tagName,
      };
      newTags.push(tagToSaveItemsCollection);
    }

    editItem.tags = newTags;
    // TODO: master_tagのdelate関連は、item.onUpdateで実施
  };

  const returnImages = (images) => {
    editItem.images = images;
  };

  const onSubmit = async (data) => {
    if (data.tags) {
      const replaceTagsName = data.tags
        .replaceAll(" ", "")
        .replaceAll("　", "")
        .replaceAll("、", ",")
        .split(",");

      const tagsDividedByComma = _.uniq(replaceTagsName);
      console.log(tagsDividedByComma);

      if (tagsDividedByComma.length > 10) {
        ftToast("タグは10個以上設定することができません");
        return false;
      }

      await createTags(tagsDividedByComma);
    }

    // editItem.links = itemLinks;
    editItem.name = data.itemName;
    editItem.description = data.description;
    editItem.createdYear = data.createdYear;
    editItem.shop.id = currentUser.shopId;
    editItem.shop.ref = doc(db, "shops", currentUser.shopId);
    editItem.shop.name = bindShop.name;

    // if (iconUrl) {
    //   editArtist.icon = iconUrl;
    // }
    // editArtist.name = data.artistName;
    // editArtist.description = data.artistDescription;

    // editItem.artist.name = data.artistName;
    // editItem.artist.ref = doc(db, "artists", editArtist.id);

    // editItem.shop.id = editArtist.shop.id = currentUser.shopId;
    // editItem.shop.ref = editArtist.shop.ref = doc(
    //   db,
    //   "shops",
    //   currentUser.shopId
    // );
    // editItem.shop.name = editArtist.shop.name = bindShop.name;

    await dispatch(createItem(editItem));
    // await dispatch(createArtist(editArtist));

    ftToast("itemが作成されました");
    router.push(`/items/${editItem.id}`);
  };

  const form = {
    width: "100%",
  };

  return (
    <>
      {editItem && (
        <>
          <Box w={"40%"} m={"0px auto"}>
            <Stack py={"30px"}>
              <Text mt={"40px"}>Item Images</Text>
              <SubImagesForm
                images={editItem.images}
                itemId={editItem.id}
                returnImages={returnImages}
              ></SubImagesForm>
            </Stack>
            <VStack>
              <form onSubmit={handleSubmit(onSubmit)} style={form}>
                <FormControl isInvalid={errors.itemName}>
                  <FormLabel>Item Name</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="戦術特化サッカーノート"
                    defaultValue={editItem.name}
                    {...register("itemName", {
                      required: "アイテム名は必須入力です",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.itemName && errors.itemName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt={"10px"}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    variant="filled"
                    placeholder="戦術に特化したサッカーノートです"
                    defaultValue={editItem.description}
                    {...register("description")}
                  ></Textarea>
                </FormControl>

                <FormControl mt={"10px"}>
                  <Text>Tags</Text>
                  <Textarea
                    variant={"filled"}
                    defaultValue={editItem.tags}
                    {...register("tags")}
                  ></Textarea>
                  <Text>
                    カンマを入れて、最大10個まで作成するこができます。
                  </Text>
                </FormControl>

                <FormControl mt={"10px"}>
                  <FormLabel>Created Year</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="2020年"
                    defaultValue={editItem.createdYear}
                    {...register("createdYear")}
                  />
                  <FormErrorMessage>
                    {errors.itemName && errors.itemName.message}
                  </FormErrorMessage>
                </FormControl>

                <VStack my={"30px"}>
                  <Button colorScheme="pink" type="submit" mt={"20px"}>
                    {submitType === "create" ? "作成する" : "更新する"}
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};

export default ItemForm;
