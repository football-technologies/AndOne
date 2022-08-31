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
  Heading,
  Icon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { BiHide, BiShow } from "react-icons/bi";

import { auth } from "@/plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { login } from "@/store/account";

import rules from "@/plugins/validation";

const Login = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>> data", data);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((auth) => {
        dispatch(
          login({
            id: auth.user.uid,
            email: auth.user.email,
            name: auth.user.displayName,
          })
        );

        toast({
          position: "top",
          title: "ログインが成功しました",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        console.log(">>>>>>>> Login User Done");
        router.push("/");
      })
      .catch((error) => {
        console.log(">>>>>>>>>>>>> error", error.message);

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
    <Box bg='white' h={"100vh"} w={"90%"} mx={"auto"}>
      <form onSubmit={handleSubmit(onSubmit)} style={form}>
        <Heading py={"50px"} as="h3" size="lg">
          Login
        </Heading>
        <FormControl isInvalid={errors.email} mt={"45px"}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            variant='filled'
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
              variant='filled'
              {...register("password", {
                required: "パスワードは必須入力です",
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

        <VStack mt={"20px"}>
          <Button
            colorScheme="pink"
            type="submit"
            isLoading={isSubmitting}
            mt={"20px"}
          >
            ログインする
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
