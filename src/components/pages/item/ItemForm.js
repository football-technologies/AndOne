import SubImagesForm from "@/components/pages/shop/SubImagesForm";
import { FtLargeButton, FtSmallButtonOutlined } from "@/components/ui/FtButton";
import useFtToast from "@/components/ui/FtToast";
import scheme from "@/helpers/scheme";
import { db } from "@/plugins/firebase";
import { ftCreateId } from "@/plugins/mixin";
import { createItem, fetchItem, updateItem } from "@/store/item";
import { fetchShop } from "@/store/shop";
import { createTag } from "@/store/tag";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Input,
  VStack,
  Textarea,
  Text,
  Button,
  Icon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { doc, query, getDocs, collection, where } from "firebase/firestore";
import _ from "lodash";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowForward } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

const ItemForm = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const currentUser = useSelector((state) => state.account);
  const bindItem = useSelector((state) => state.item.item);
  const bindShop = useSelector((state) => state.shop.shop);

  const router = useRouter();
  const dispatch = useDispatch();

  const { ftToast } = useFtToast();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.itemId) {
        dispatch(
          fetchItem({
            query: `items/${router.query.itemId}`,
            isOnSnapshot: true,
            type: "fetch",
          })
        );

        return () => {
          dispatch(
            fetchItem({
              query: `items/${router.query.itemId}`,
              isOnSnapshot: true,
              type: "delete",
            })
          );
        };
      } else {
        const item = _.cloneDeep(scheme.items);
        item.id = ftCreateId("item");

        setEditItem(item);
        setIsEditMode(false);

        return () => {
          setEditItem(null);
          setIsEditMode(false);
        };
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindItem) {
      if (router.query.itemId) {
        const item = _.cloneDeep(bindItem);

        if (item.tags.length > 0) {
          const tagNames = [];
          for (const tag of item.tags) {
            tagNames.push(tag.name);
          }
          const tags = tagNames.join();
          item.tags = tags;
        }
        setEditItem(item);
        setIsEditMode(true);
      }

      return () => {
        setEditItem(null);
        setIsEditMode(false);
      };
    }
  }, [bindItem]);

  useEffect(() => {
    dispatch(
      fetchShop({
        query: `shops/${currentUser.shopId}`,
        isOnSnapshot: true,
        type: "fetch",
      })
    );

    return () => {
      dispatch(
        fetchShop({
          query: `shops/${currentUser.shopId}`,
          isOnSnapshot: true,
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
    // TODO: master_tag???delate????????????item.onUpdate?????????
  };

  const returnImages = (images) => {
    editItem.images = images;
  };

  const onSubmit = async (data) => {
    if (editItem.images.length === 0) {
      ftToast("????????????????????????????????????????????????");
      return false;
    }

    if (data.tags) {
      const replaceTagsName = data.tags
        .replaceAll(" ", "")
        .replaceAll("???", "")
        .replaceAll("???", ",")
        .split(",");

      const tagsDividedByComma = _.uniq(replaceTagsName);

      if (tagsDividedByComma.length > 10) {
        ftToast("?????????10?????????????????????????????????????????????");
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
    editItem.shop.icon = bindShop.icon;

    if (!isEditMode) {
      await dispatch(createItem(editItem));
      ftToast("item????????????????????????");
    }

    if (isEditMode) {
      await dispatch(updateItem(editItem));
      ftToast("item?????????????????????");
    }

    router.push(`/items/${editItem.id}`);
  };

  const deleteItem = () => {
    editItem.status = 3;
    dispatch(updateItem(editItem));
    ftToast("item?????????????????????");
    router.push("/");
  };

  const form = {
    width: "100%",
  };

  return (
    <>
      {editItem && (
        <>
          {isEditMode && (
            <Flex p="5">
              <Box>
                <FtSmallButtonOutlined onClick={deleteItem}>
                  ???????????????????????????
                </FtSmallButtonOutlined>
              </Box>
              <Spacer />
              <Box>
                <NextLink href={`/items/${editItem.id}`}>
                  <Button as="a" variant="link">
                    Back
                    <Icon as={MdArrowForward} ml="1"></Icon>
                  </Button>
                </NextLink>
              </Box>
            </Flex>
          )}

          <Box w="500px" mx="auto">
            <FormControl isRequired py="30px">
              <FormLabel>Item Images</FormLabel>
              <SubImagesForm
                images={editItem.images}
                itemId={editItem.id}
                returnImages={returnImages}
              ></SubImagesForm>
            </FormControl>

            <VStack>
              <form onSubmit={handleSubmit(onSubmit)} style={form}>
                <FormControl isRequired isInvalid={errors.itemName}>
                  <FormLabel>Item Name</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="????????????????????? 2005???????????? Home"
                    defaultValue={editItem.name}
                    {...register("itemName", {
                      required: "????????????????????????????????????",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.itemName && errors.itemName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt="10">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    variant="filled"
                    h="10em"
                    placeholder="????????????????????????????????????????????????????????????
                    ?????????????????????????????????????????????????????????????????????????????????????????????????????????
                    ???????????????????????????2??????
                    ???????????????2003?????????????????????????????????"
                    defaultValue={editItem.description}
                    {...register("description")}
                  ></Textarea>
                </FormControl>

                <FormControl mt="10">
                  <Text>Tags</Text>
                  <Textarea
                    variant={"filled"}
                    placeholder="????????????????????????,football,??????,2011"
                    defaultValue={editItem.tags}
                    {...register("tags")}
                  ></Textarea>
                  <Text fontSize="sm">
                    ??????????????????????????????10??????????????????????????????????????????
                  </Text>
                </FormControl>

                <FormControl mt="10">
                  <FormLabel>Created Year</FormLabel>
                  <Input
                    variant="filled"
                    w="50%"
                    placeholder="??????2020???"
                    defaultValue={editItem.createdYear}
                    {...register("createdYear")}
                  />
                  <FormErrorMessage>
                    {errors.itemName && errors.itemName.message}
                  </FormErrorMessage>
                </FormControl>

                <VStack mt={"30px"}>
                  <FtLargeButton colorScheme="pink" type="submit">
                    {isEditMode ? "????????????" : "????????????"}
                  </FtLargeButton>
                </VStack>
                <Box>
                  <Text mb="30px" color="red.400">
                    *??????
                  </Text>
                </Box>
              </form>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};

export default ItemForm;
