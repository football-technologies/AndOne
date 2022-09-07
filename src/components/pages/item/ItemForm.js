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
import { createTag, deleteTag } from "@/store/tag";
import { UploadIcon, UploadMain, UploadSub } from "@/components/ui/ImageUpload";

import { db } from "@/plugins/firebase";
import { doc } from "firebase/firestore";

import _ from "lodash";
import rules from "@/plugins/validation";
import scheme from "@/helpers/scheme";

const ItemForm = () => {
  const [iconUrl, setIconUrl] = useState(null);
  const [subUrls, setSubUrl] = useState([
    { index: 0, url: null, caption: null },
    { index: 1, url: null, caption: null },
    { index: 2, url: null, caption: null },
    { index: 3, url: null, caption: null },
    { index: 4, url: null, caption: null },
    { index: 5, url: null, caption: null },
    { index: 6, url: null, caption: null },
    { index: 7, url: null, caption: null },
  ]);
  const [mainUrl, setMainUrl] = useState(null);
  const [submitType, setSubmitType] = useState(null);
  const [tags, setTags] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editArtist, setEditArtist] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);

  const currentUser = useSelector((state) => state.account);
  const bindItem = useSelector((state) => state.item.item);
  const bindArtist = useSelector((state) => state.artist.artist);

  const router = useRouter();

  const iconRef = useRef();
  const mainRef = useRef();
  const subRefs = useRef([]);

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
        const artist = _.cloneDeep(scheme.artists);
        item.id = ftCreateId("item");
        artist.id = ftCreateId("artist");

        setEditItem(item);
        setEditArtist(artist);
        setSubmitType("create");
        setDisplayImages([...Array(8)]);

        return () => {
          setEditItem(null);
          setSubmitType(null);
          setTags(null);
          setSubUrl([
            { index: 0, url: null, caption: null },
            { index: 1, url: null, caption: null },
            { index: 2, url: null, caption: null },
            { index: 3, url: null, caption: null },
            { index: 4, url: null, caption: null },
            { index: 5, url: null, caption: null },
            { index: 6, url: null, caption: null },
            { index: 7, url: null, caption: null },
            { index: 8, url: null, caption: null },
          ]);
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
        setTags(tags);
      }

      if (editItem.images.length > 0) {
        setDisplayImages([...editItem.images]);
      } else {
        setDisplayImages([...Array(8)]);
      }

      setSubmitType("update");
      setSubUrl({ ...item.images });
      setEditItem(item);
    }

    return () => {
      setEditItem(null);
      setSubmitType(null);
      setTags(null);
      setSubUrl([
        { index: 0, url: null, caption: null },
        { index: 1, url: null, caption: null },
        { index: 2, url: null, caption: null },
        { index: 3, url: null, caption: null },
        { index: 4, url: null, caption: null },
        { index: 5, url: null, caption: null },
        { index: 6, url: null, caption: null },
        { index: 7, url: null, caption: null },
        { index: 8, url: null, caption: null },
      ]);
    };
  }, [bindItem]);

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

  const uploadSub = (obj) => {
    console.log(">>>>>>>>>>>>> return sub URL", obj.url);
    const newSubUrls = _.cloneDeep(subUrls);

    const editSubUrl = _.find(newSubUrls, function (subUrl) {
      return subUrl.index === obj.index;
    });

    newSubUrls[editSubUrl.index].url = obj.url;

    setSubUrl(newSubUrls);
  };

  const onChangeSetTags = (e) => {
    setTags(e.target.value);
  };

  const form = {
    width: "100%",
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {editItem && editArtist && (
        <>
          <Box w={"40%"} m={"0px auto"}>
            <VStack>
              <Text align={"start"} my={"30px"}>
                Item Images
              </Text>
              {editItem.images.length > 0 ? (
                <Wrap spacing="15px">
                  {displayImages.map((image, index) => {
                    subRefs.current[index] = createRef();
                    if (subUrls[index].url) {
                      return (
                        <WrapItem key={index}>
                          <Image
                            boxSize={"90px"}
                            rounded={"xl"}
                            className="ftHover"
                            onClick={() => {
                              subRefs.current[index].current?.click();
                            }}
                            src={subUrls[index].url}
                          ></Image>
                          <UploadSub
                            ref={subRefs.current[index]}
                            folderPath={`items/${editItem.id}/sub/${index}`}
                            index={index}
                            uploadSub={uploadSub}
                          ></UploadSub>
                        </WrapItem>
                      );
                    } else if (image.url) {
                      return (
                        <WrapItem key={index}>
                          <Image
                            boxSize={"90px"}
                            rounded={"xl"}
                            className="ftHover"
                            onClick={() => {
                              subRefs.current[index].current?.click();
                            }}
                            src={image.url}
                          ></Image>
                          <UploadSub
                            ref={subRefs.current[index]}
                            folderPath={`items/${editItem.id}/sub/${index}`}
                            index={index}
                            uploadSub={uploadSub}
                          ></UploadSub>
                        </WrapItem>
                      );
                    } else {
                      return (
                        <WrapItem key={index}>
                          <Image
                            boxSize={"90px"}
                            rounded={"xl"}
                            className="ftHover"
                            onClick={() => {
                              subRefs.current[index].current?.click();
                            }}
                            src="https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
                          ></Image>
                          <UploadSub
                            ref={subRefs.current[index]}
                            folderPath={`items/${editItem.id}/sub/${index}`}
                            index={index}
                            uploadSub={uploadSub}
                          ></UploadSub>
                        </WrapItem>
                      );
                    }
                  })}
                </Wrap>
              ) : (
                <Wrap spacing="15px">
                  {displayImages.map((_, index) => {
                    subRefs.current[index] = createRef();
                    if (subUrls[index].url) {
                      return (
                        <WrapItem key={index}>
                          <Image
                            boxSize={"90px"}
                            rounded={"xl"}
                            className="ftHover"
                            onClick={() => {
                              subRefs.current[index].current?.click();
                            }}
                            src={subUrls[index].url}
                          ></Image>
                          <UploadSub
                            ref={subRefs.current[index]}
                            folderPath={`items/${editItem.id}/sub/${index}`}
                            index={index}
                            uploadSub={uploadSub}
                          ></UploadSub>
                        </WrapItem>
                      );
                    } else {
                      return (
                        <WrapItem key={index}>
                          <Image
                            boxSize={"90px"}
                            rounded={"xl"}
                            className="ftHover"
                            onClick={() => {
                              subRefs.current[index].current?.click();
                            }}
                            src="https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
                          ></Image>
                          <UploadSub
                            ref={subRefs.current[index]}
                            folderPath={`items/${editItem.id}/sub/${index}`}
                            index={index}
                            uploadSub={uploadSub}
                          ></UploadSub>
                        </WrapItem>
                      );
                    }
                  })}
                </Wrap>
              )}

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
                    onChange={onChangeSetTags}
                    defaultValue={tags}
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

                <Text mt={"10px"}>Artist</Text>
                <Stack align={"end"}>
                  <FormControl mt={"10px"} w={"90%"}>
                    <FormLabel>Name</FormLabel>
                    <Textarea
                      variant="filled"
                      placeholder="ティンカーハット"
                      defaultValue={editArtist.name}
                      {...register("artistName")}
                    ></Textarea>
                  </FormControl>
                  <FormControl mt={"10px"} w={"90%"}>
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                      variant="filled"
                      placeholder="ドイツ生まれの世界的なフットボールコーチです"
                      defaultValue={editArtist.description}
                      {...register("artistDescription")}
                    ></Textarea>
                  </FormControl>
                </Stack>

                <Text mt={"10px"}>Links（最大10個まで）</Text>
                <Stack align={"end"}>
                  {[...Array(9)].map((_, index) => (
                    <FormControl key={index} mt={"10px"} w={"90%"}>
                      <Input
                        variant="filled"
                        placeholder={`https://apple.com/shibauraG2913`}
                        // defaultValue={}
                        {...register("links")}
                      />
                    </FormControl>
                  ))}
                </Stack>

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
