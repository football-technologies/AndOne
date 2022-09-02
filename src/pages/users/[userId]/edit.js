import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/store/user";
import { fetchSecret } from "@/store/secret";

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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { FtButtonOutlinedSmall } from "@/components/ui/FtButton";

import ImageUpload from "@/components/ui/ImageUpload";

import _ from "lodash";
import rules from "@/plugins/validation";

const Edit = ({ query }) => {
  const currentUser = useSelector((state) => state.account);
  const bindUser = useSelector((state) => state.user.user);
  const bindSecret = useSelector((state) => state.secret.secret);
  const router = useRouter();
  const toast = useToast();
  const inputRef = useRef();
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

  const openInputRef = () => {
    inputRef.current.click();
  };

  const upload = (url) => {
    console.log(">>>>>>> return url", url);
  };

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);
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
              {user.icon ? (
                <Avatar src={user.icon} size="xl" />
              ) : (
                <Avatar name={user.displayName} size="xl" />
              )}
            </Box>
            <Box pl={"10px"}>
              <ImageUpload
                ref={inputRef}
                folderPath={`users/${user.id}/icon`}
                upload={upload}
              ></ImageUpload>
              <FtButtonOutlinedSmall onClick={openInputRef}>
                iconを変更する
              </FtButtonOutlinedSmall>
            </Box>
          </HStack>

          <FormControl mt={"45px"}>
            <FormLabel>Display Name</FormLabel>
            <Input type="displayName" variant="filled" placeholder="山下俊朗" />
            <FormHelperText>他の人に表示されます</FormHelperText>
          </FormControl>

          <FormControl isInvalid={errors.screenName} mt={"45px"}>
            <FormLabel>Screen Name</FormLabel>
            <Input
              type="screenName"
              variant="filled"
              value={user.screenName}
              placeholder="footballworld"
              {...register("secretName", {
                pattern: {
                  value: rules.name,
                  message: "半角英数字のみがご利用できます",
                },
                onChange: (e) => {
                  console.log(e.target.value);
                },
              })}
            />
            <FormHelperText>他の人に表示されます</FormHelperText>
            <FormErrorMessage>
              {errors.screenName && errors.screenName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.bio} mt={"45px"}>
            <FormLabel>Bio</FormLabel>
            <Textarea type="bio" variant="filled" placeholder="bio"></Textarea>
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
              {...register("email", {
                required: "メールアドレスは必須入力です",
                pattern: {
                  value: rules.email,
                  message: "メールアドレスの形式が異なります",
                },
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
              {...register("address", {
                required: "住所は必須入力です",
              })}
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
