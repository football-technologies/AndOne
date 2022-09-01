import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import useAuthentication from "@/components/layouts/Authentication";

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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { FtButtonOutlinedSmall } from "@/components/ui/FtButton";
import UserIcon from "@/components/ui/UserIcon";

import _ from "lodash";
import rules from "@/plugins/validation";

const Edit = () => {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);
  };

  const form = {
    width: "300px",
    margin: "45px auto",
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit(onSubmit)} style={form}>
        <HStack>
          <Box>
            {currentUser.iconUrl ? (
              <UserIcon url={currentUser.iconUrl} size="xl" />
            ) : (
              <UserIcon name={currentUser.name} size="xl" />
            )}
          </Box>
          <Box pl={"10px"}>
            <FtButtonOutlinedSmall>iconを変更する</FtButtonOutlinedSmall>
          </Box>
        </HStack>

        <FormControl mt={"45px"}>
          <FormLabel>Display Name</FormLabel>
          <Input type="displayName" variant="filled" placeholder="山下俊朗" />
          <FormHelperText>他の人に表示されます</FormHelperText>
        </FormControl>

        <FormControl isInvalid={errors.secretName} mt={"45px"}>
          <FormLabel>Secret Name</FormLabel>
          <Input
            type="secretName"
            variant="filled"
            placeholder="footballworld"
            {...register("secretName", {
              pattern: {
                value: rules.name,
                message: "半角英数字のみがご利用できます",
              },
            })}
          />
          <FormHelperText>他の人に表示されます</FormHelperText>
          <FormErrorMessage>
            {errors.secretName && errors.secretName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.bio} mt={"45px"}>
          <FormLabel>Bio</FormLabel>
          <Textarea
            type="bio"
            variant="filled"
            placeholder="bio"
            {...register("bio", {
              required: "Bioは必須入力です",
            })}
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
};

export default Edit;
