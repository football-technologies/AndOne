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
import { BiHide, BiShow } from "react-icons/bi";

import { auth } from "@/plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { login } from "@/store/account";

const Login = () => {
  const [show, setShow] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

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
        console.log(">>>>>>>> Login User Done");
        router.push("/");
      })
      .catch((error) => {
        console.log(">>>>>>>>>>>>> error", error.message);
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
          ログイン
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

export default Login;
