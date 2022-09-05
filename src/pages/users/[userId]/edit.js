import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, update } from "@/store/user";
import { fetchSecret, updateSecret } from "@/store/secret";
import { updateAccount } from "@/store/account";

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
  Stack,
} from "@chakra-ui/react";
import useFtToast from "@/components/ui/FtToast";
import { FtSmallButtonOutlined } from "@/components/ui/FtButton";

import { UploadIcon } from "@/components/ui/ImageUpload";

import _ from "lodash";
import rules from "@/plugins/validation";

const Edit = ({ query }) => {
  const [url, setUrl] = useState(null);

  const bindUser = useSelector((state) => state.user.user);
  const bindSecret = useSelector((state) => state.secret.secret);

  const router = useRouter();
  const { ftToast } = useFtToast();
  const iconRef = useRef();
  const dispatch = useDispatch();

  const user = _.cloneDeep(bindUser);
  const secret = _.cloneDeep(bindSecret);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    dispatch(
      fetchUser({
        query: query.userId,
        type: "fetch",
      })
    );

    dispatch(
      fetchSecret({
        query: query.userId,
        type: "fetch",
      })
    );

    return () => {
      dispatch(
        fetchUser({
          query: query.userId,
          type: "delete",
        })
      );

      dispatch(
        fetchSecret({
          query: query.userId,
          type: "delete",
        })
      );
    };
  }, [dispatch]);

  const openIconRef = () => {
    iconRef.current.click();
  };

  const uploadIcon = (url) => {
    console.log(">>>>>>> return url", url);
    setUrl(url);
  };

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);

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
      })
    );

    dispatch(update(user));
    dispatch(updateSecret(secret));

    ftToast("プロフィールの更新が完了しました");
    router.push("/");
  };

  const form = {
    width: "300px",
    margin: "45px auto",
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
                <UploadIcon
                  ref={iconRef}
                  folderPath={`users/${user.id}/icon`}
                  uploadIcon={uploadIcon}
                ></UploadIcon>
              </HStack>
              <HStack>
                <FtSmallButtonOutlined onClick={openIconRef}>
                  iconを変更する
                </FtSmallButtonOutlined>
              </HStack>
            </Box>
          </HStack>

          <FormControl mt={"45px"}>
            <FormLabel>Display Name</FormLabel>
            <Input
              type="displayName"
              variant="filled"
              placeholder="山下俊朗"
              defaultValue={user.displayName}
              {...register("displayName")}
            />
            <FormHelperText>他の人に表示されます</FormHelperText>
          </FormControl>

          <FormControl isInvalid={errors.screenName} mt={"45px"}>
            <FormLabel>Screen Name</FormLabel>
            <Input
              type="screenName"
              variant="filled"
              defaultValue={user.screenName}
              placeholder="footballworld"
              {...register("screenName", {
                pattern: rules.name,
              })}
            />
            <FormHelperText>他の人に表示されます</FormHelperText>
            <FormErrorMessage>
              {errors.screenName && errors.screenName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.bio} mt={"45px"}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              type="bio"
              variant="filled"
              placeholder="bio"
              defaultValue={user.description}
              {...register("description")}
            ></Textarea>
            <FormHelperText>他の人に表示されます</FormHelperText>
            <FormErrorMessage>
              {errors.bio && errors.bio.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} mt={"45px"}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              variant="filled"
              placeholder="steve@apple.com"
              defaultValue={secret.email}
              {...register("email", {
                required: "メールアドレスは必須入力です",
                pattern: rules.email,
              })}
            />
            <FormHelperText>
              他の人に表示されません <br />
              ログイン、または運営からのお知らせ時に利用します。
            </FormHelperText>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.address} mt={"45px"}>
            <FormLabel>Address</FormLabel>
            <Textarea
              type="address"
              variant="filled"
              placeholder="東京都千代田区1-11-1"
              defaultValue={secret.address}
              {...register("address")}
            ></Textarea>
            <FormHelperText>
              他の人に表示されません <br />
              アイテム購入時に、販売ショップの人のみが確認してすることができます。
            </FormHelperText>
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>

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
    );
  }
};

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default Edit;
