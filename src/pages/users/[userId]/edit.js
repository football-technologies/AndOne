import rules from "@/plugins/validation";
import { updateAccount } from "@/store/account";
import { fetchSecret, updateSecret } from "@/store/secret";
import { fetchUser, updateUser } from "@/store/user";
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
  Avatar,
  Text,
} from "@chakra-ui/react";
import useFtToast from "@/components/ui/FtToast";
import { FtSmallButtonOutlined } from "@/components/ui/FtButton";

import { UploadSingleImage } from "@/components/ui/ImageUpload";

import _ from "lodash";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

const Edit = () => {
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);

  const bindUser = useSelector((state) => state.user.user);
  const bindSecret = useSelector((state) => state.secret.secret);

  const router = useRouter();
  const { ftToast } = useFtToast();
  const singleSelectInputRef = useRef();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.userId) {
        dispatch(
          fetchUser({
            query: `users/${router.query.userId}`,
            isOnSnapshot: true,
            type: "fetch",
          })
        );

        dispatch(
          fetchSecret({
            query: `users/${router.query.userId}/secrets/${router.query.userId}`,
            isOnSnapshot: true,
            type: "fetch",
          })
        );

        return () => {
          dispatch(
            fetchUser({
              query: `users/${router.query.userId}`,
              isOnSnapshot: true,
              type: "delete",
            })
          );

          dispatch(
            fetchSecret({
              query: `users/${router.query.userId}/secrets/${router.query.userId}`,
              isOnSnapshot: true,
              type: "delete",
            })
          );
        };
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindUser && bindSecret) {
      if (router.query.userId) {
        const user = _.cloneDeep(bindUser);
        const secret = _.cloneDeep(bindSecret);
        setUser(user);
        setSecret(secret);
      }
    }
  }, [bindUser, bindSecret]);

  const openSingleSelectInputRef = () => {
    singleSelectInputRef.current.click();
  };

  const uploadSingleImage = ({ url, type }) => {
    console.log(">>>>>>> return single image url", url, type);
    setUrl(url);
  };

  const onSubmit = (data) => {
    user.displayName = data.displayName;
    user.screenName = data.screenName;
    user.description = data.description;
    secret.email = data.email;
    secret.address = data.address;

    if (url) {
      user.icon = url;
    }

    dispatch(
      updateAccount({
        id: user.id,
        authId: user.authId,
        email: data.email,
        name: data.displayName,
        icon: user.icon,
        shopId: user.shop.id,
      })
    );

    dispatch(updateUser(user));
    dispatch(updateSecret(secret));

    ftToast("????????????????????????????????????????????????");
    router.push("/");
  };

  const form = {
    width: "300px",
    margin: "45px auto 0px",
  };

  if (user && secret) {
    return (
      <VStack>
        <form onSubmit={handleSubmit(onSubmit)} style={form}>
          <HStack>
            <Box>
              {url ? (
                <Avatar src={url} size="xl" />
              ) : user.icon ? (
                <Avatar src={user.icon} size="xl" />
              ) : (
                <Avatar name={user.displayName} size="xl" />
              )}
            </Box>
            <Box pl={"10px"}>
              <HStack mb={"5px"}>
                <UploadSingleImage
                  ref={singleSelectInputRef}
                  folderPath={`users/${user.id}/icon`}
                  uploadSingleImage={uploadSingleImage}
                  type="icon"
                ></UploadSingleImage>
              </HStack>
              <HStack>
                <FtSmallButtonOutlined onClick={openSingleSelectInputRef}>
                  icon???????????????
                </FtSmallButtonOutlined>
              </HStack>
            </Box>
          </HStack>

          <FormControl isRequired isInvalid={errors.displayName} mt="45px">
            <FormLabel>Display Name</FormLabel>
            <Input
              variant="filled"
              placeholder="??????????????????"
              defaultValue={user.displayName}
              {...register("displayName", {
                required: "???????????????????????????",
              })}
            />
            <FormHelperText>??????????????????????????????</FormHelperText>
            <FormErrorMessage>
              {errors.displayName && errors.displayName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.screenName} mt="45px">
            <FormLabel>Screen Name</FormLabel>
            <Input
              variant="filled"
              defaultValue={user.screenName}
              placeholder="??????taro1234"
              {...register("screenName", {
                pattern: rules.name,
              })}
            />
            <FormHelperText>??????????????????????????????</FormHelperText>
            <FormErrorMessage>
              {errors.screenName && errors.screenName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.bio} mt="45px">
            <FormLabel>Bio</FormLabel>
            <Textarea
              variant="filled"
              rows={6}
              placeholder="??????????????????????????????10??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
              defaultValue={user.description}
              {...register("description")}
            ></Textarea>
            <FormHelperText>??????????????????????????????</FormHelperText>
            <FormErrorMessage>
              {errors.bio && errors.bio.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.email} mt="45px">
            <FormLabel>Email</FormLabel>
            <Input
              variant="filled"
              placeholder="??????steve@apple.com"
              defaultValue={secret.email}
              {...register("email", {
                required: "??????????????????????????????????????????",
                pattern: rules.email,
              })}
            />
            <FormHelperText>
              ????????????????????????????????? <br />
              ???????????????????????????????????????????????????????????????????????????
            </FormHelperText>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mt="45px">
            <FormLabel>Address</FormLabel>
            <Textarea
              variant="filled"
              placeholder="???????????????????????????1-11-1"
              defaultValue={secret.address}
              {...register("address")}
            ></Textarea>
            <FormHelperText>
              ????????????????????????????????? <br />
              ??????????????????????????????????????????????????????????????????????????????????????????????????????
            </FormHelperText>
          </FormControl>

          <VStack mt="20px">
            <Button
              colorScheme="pink"
              type="submit"
              isLoading={isSubmitting}
              mt="20px"
            >
              ????????????
            </Button>
          </VStack>
        </form>
        <Box w="50%">
          <Text mb="30px" color="red.400" textAlign="left">
            *??????
          </Text>
        </Box>
      </VStack>
    );
  }
};

export default Edit;
