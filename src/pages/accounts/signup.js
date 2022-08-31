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
import { createUserWithEmailAndPassword } from "firebase/auth";

import { signup } from "@/store/account";

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

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((auth) => {
        console.log(">>>>>>>>>>> auth.user", auth.user);

        dispatch(
          signup({
            id: auth.user.uid,
            email: auth.user.email,
            name: auth.user.name,
          })
        );

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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} style={form}>
        <Heading as="h3" size="lg" textAlign={"center"}>
          会員登録
        </Heading>
        <FormControl isInvalid={errors.email} mt={"45px"}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email", {
              required: "メールアドレスは必須入力です",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
              {...register("password", {
                required: "パスワードは必須入力です",
                onBlur: () => {
                  if (getValues("confirmPassword")) {
                    trigger("confirmPassword");
                  }
                },
                minLength: {
                  value: 6,
                  message: "6文字以上の入力が必要です",
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
            送信する
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
