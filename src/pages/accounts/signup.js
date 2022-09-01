import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";

import { auth } from "@/plugins/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { signup } from "@/store/account";
import { create } from "@/store/user";
import { createSecret } from "@/store/secret";

import _ from "lodash";
import scheme from "@/helpers/scheme";
import { ftCreateId } from "@/plugins/mixin";
import rules from "@/plugins/validation";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
  } = useForm();

  const user = _.cloneDeep(scheme.users);
  const secret = _.cloneDeep(scheme.secrets);

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (auth) => {
        console.log(">>>>>>>>>>> auth.user", auth.user);

        const userId = ftCreateId("user");

        user.id = secret.id = userId;
        secret.email = auth.user.email;

        await dispatch(
          signup({
            id: auth.user.uid,
            email: auth.user.email,
            name: auth.user.displayName,
          })
        );

        await dispatch(create(user));

        await dispatch(createSecret(secret));

        toast({
          position: "top",
          title: "ログインが成功しました",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        console.log(">>>>>>>> Create User Done");
        router.push("/");
      })
      .catch((error) => {
        console.log(">>>>>>>>>>>>>> error", error.message);

        toast({
          position: "top",
          title: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const form = {
    width: "400px",
    margin: "45px auto",
  };

  return (
    <Box bg="white" h={"100vh"} w={"90%"} mx={"auto"}>
      <form onSubmit={handleSubmit(onSubmit)} style={form}>
        <Heading py={"50px"} as="h3" size="lg">
          Signup
        </Heading>
        <FormControl isInvalid={errors.name}>
          <FormLabel>User Name</FormLabel>
          <Input
            type="name"
            variant="filled"
            placeholder="johndoe"
            {...register("name", {
              required: "User Nameは必須入力です",
              pattern: {
                value: rules.name,
                message: "半角英数字のみがご利用できます",
              },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
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
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password} mt={"45px"}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              variant="filled"
              {...register("password", {
                required: "パスワードは必須入力です",
                onBlur: () => {
                  if (getValues("confirmPassword")) {
                    trigger("confirmPassword");
                  }
                },
                pattern: {
                  value: rules.password,
                  message: "半角英数字で6文字以上の入力が必要です",
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? <Icon as={BiHide}></Icon> : <Icon as={BiShow}></Icon>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword} mt={"45px"}>
          <FormLabel>Password（確認用）</FormLabel>
          <InputGroup>
            <Input
              type={showConfirm ? "text" : "password"}
              variant="filled"
              {...register("confirmPassword", {
                required: "確認のためパスワードを再入力してください",
                validate: (value) => {
                  return (
                    value === getValues("password") ||
                    "パスワードが一致しません"
                  );
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <Icon as={BiHide}></Icon>
                ) : (
                  <Icon as={BiShow}></Icon>
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <VStack mt={"20px"}>
          <Button
            colorScheme="pink"
            type="submit"
            isLoading={isSubmitting}
            mt={"20px"}
          >
            アカウントを作成
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;