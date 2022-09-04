import { useFieldArray, useForm } from "react-hook-form";
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

import ImageUpload from "@/components/ui/ImageUpload";

import _ from "lodash";
import rules from "@/plugins/validation";

const ShopForm = () => {
  const [url, setUrl] = useState(null);
  const inputRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const snsList = [
    { id: 1, name: "Twitter", type: "twitter" },
    { id: 2, name: "Facebook", type: "facebook" },
    { id: 3, name: "Instagram", type: "instagram" },
    { id: 4, name: "Tiktok", type: "tiktok" },
    { id: 5, name: "Homepage", type: "homepage" },
    { id: 6, name: "Blog", type: "blog" },
    { id: 7, name: "Others", type: "others" },
  ];

  const openInputRef = () => {
    inputRef.current.click();
  };

  const upload = (url) => {
    console.log(">>>>>>>>>>>>> return URL", url);
    setUrl(url);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <HStack bg={"lightGray"}>
        {url ? (
          <AspectRatio w={"100%"} h={"350px"} ratio={2.5}>
            <Image className="ftHover" onClick={openInputRef} src={url}></Image>
          </AspectRatio>
        ) : (
          <AspectRatio w={"100%"} h={"350px"} ratio={2.5}>
            <Image
              className="ftHover"
              onClick={openInputRef}
              src="https://hayamiz.xsrv.jp/wp-content/themes/affinger/images/no-img.png"
            ></Image>
          </AspectRatio>
        )}
      </HStack>
      <HStack mt={"50px"}>
        <Stack w={"30%"} h={"200vh"}>
          <VStack>
            <Text mb={"15px"}>Shop Icon Image</Text>
            <Box>
              {url ? (
                <Image src={url} boxSize={"120px"} rounded={"xl"}></Image>
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
                <ImageUpload
                  ref={inputRef}
                  folderPath={`shops/icon`}
                  upload={upload}
                ></ImageUpload>
                <FtMiddleButtonOutlined onClick={openInputRef}>
                  iconを変更する
                </FtMiddleButtonOutlined>
              </VStack>
            </Box>
          </VStack>
          <VStack>
            <Text>Tags</Text>
            <Textarea w={"80%"} variant={"filled"}></Textarea>
            <Text w={"80%"}>
              カンマを入れて、最大10個まで作成するこができます。
            </Text>
          </VStack>
        </Stack>
        <Stack w={"40%"} h={"200vh"}>
          <VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Shop Name</FormLabel>
                <Input
                  type="ShopName"
                  variant="filled"
                  placeholder="芝浦World Football Gallery"
                  {...register("ShopName")}
                />
              </FormControl>

              <FormControl isInvalid={errors.originalUrl} mt={"10px"}>
                <FormLabel>Original URL</FormLabel>
                <Input
                  type="originalUrl"
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
                  type="bio"
                  variant="filled"
                  placeholder="bio"
                  {...register("description")}
                ></Textarea>
              </FormControl>

              <FormControl mt={"10px"}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  type="address"
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
                  type="openHour"
                  variant="filled"
                  placeholder="10時 - 20時"
                  {...register("openHour")}
                />
              </FormControl>

              <FormControl mt={"10px"}>
                <FormLabel>Holidays</FormLabel>
                <Input
                  type="holidays"
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
                <Button
                  colorScheme="pink"
                  type="submit"
                  isLoading={isSubmitting}
                  mt={"20px"}
                >
                  更新する
                </Button>
              </VStack>
            </form>
          </VStack>
        </Stack>
        <Stack w={"30%"} h={"200vh"}>
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
