import { FtSmallButtonOutlined } from "@/components/ui/FtButton";
import useFtToast from "@/components/ui/FtToast";
import { UploadIcon } from "@/components/ui/ImageUpload";
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
  const iconRef = useRef();
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
        shopId: user.shopId,
      })
    );

    dispatch(updateUser(user));
    dispatch(updateSecret(secret));

    ftToast("プロフィールの更新が完了しました");
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
            <Box pl="10px">
              <HStack mb="5px">
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

          <FormControl isRequired isInvalid={errors.displayName} mt="45px">
            <FormLabel>Display Name</FormLabel>
            <Input
              variant="filled"
              placeholder="例）田中太郎"
              defaultValue={user.displayName}
              {...register("displayName", {
                required: "名前は必須入力です",
              })}
            />
            <FormHelperText>他の人に表示されます</FormHelperText>
            <FormErrorMessage>
              {errors.displayName && errors.displayName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.screenName} mt="45px">
            <FormLabel>Screen Name</FormLabel>
            <Input
              variant="filled"
              defaultValue={user.screenName}
              placeholder="例）taro1234"
              {...register("screenName", {
                pattern: rules.name,
              })}
            />
            <FormHelperText>他の人に表示されます</FormHelperText>
            <FormErrorMessage>
              {errors.screenName && errors.screenName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.bio} mt="45px">
            <FormLabel>Bio</FormLabel>
            <Textarea
              variant="filled"
              rows={6}
              placeholder="例）サッカーファン歴10年。好きなチームは浦和レッズ。色々なチームのユニフォームを集めるのが趣味です。一番の宝物は西川周作のサイン入りユニフォーム。"
              defaultValue={user.description}
              {...register("description")}
            ></Textarea>
            <FormHelperText>他の人に表示されます</FormHelperText>
            <FormErrorMessage>
              {errors.bio && errors.bio.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.email} mt="45px">
            <FormLabel>Email</FormLabel>
            <Input
              variant="filled"
              placeholder="例）steve@apple.com"
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

          <FormControl mt="45px">
            <FormLabel>Address</FormLabel>
            <Textarea
              variant="filled"
              placeholder="例）東京都千代田区1-11-1"
              defaultValue={secret.address}
              {...register("address")}
            ></Textarea>
            <FormHelperText>
              他の人に表示されません <br />
              アイテム購入時に、販売ショップの人のみが確認してすることができます。
            </FormHelperText>
          </FormControl>

          <VStack mt="20px">
            <Button
              colorScheme="pink"
              type="submit"
              isLoading={isSubmitting}
              mt="20px"
            >
              更新する
            </Button>
          </VStack>
        </form>
        <Box w="50%">
          <Text mb="30px" color="red.400" textAlign="left">
            *必須
          </Text>
        </Box>
      </VStack>
    );
  }
};

export default Edit;
