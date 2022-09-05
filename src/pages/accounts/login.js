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
import useFtToast from "@/components/ui/FtToast";

import { BiHide, BiShow } from "react-icons/bi";

import { auth } from "@/plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@/plugins/firebase";
import { getDocs, where, collection, query, doc, getDoc } from "firebase/firestore";

import { login } from "@/store/account";

import rules from "@/plugins/validation";

const Login = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { ftToast } = useFtToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>> data", data);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (auth) => {
        const q = query(
          collection(db, "users"),
          where("authId", "==", auth.user.uid)
        );

        const user = null;
        await getDocs(q).then((snapshot) => {
          snapshot.forEach(async (doc) => {
            if (doc.id) {
              user = doc.data();
            }
          });
        });

        const secret = null;
        await getDoc(doc(db, `users/${user.id}/secrets`, user.id)).then(
          async (doc) => {
            if (doc.id) {
              secret = doc.data();
            }
          }
        );

        if (user && secret) {
          dispatch(
            login({
              id: user.id,
              authId: user.authId,
              email: secret.email,
              name: user.displayName,
              icon: user.icon,
              shopId: user.shop.id,
            })
          );
        }

        ftToast("ログインが成功しました");
        setIsLoading(false);
        console.log(">>>>>>>> Login User Done");
        router.push("/");
      })
      .catch((error) => {
        console.log(">>>>>>>>>>>>> error", error.message);
        setIsLoading(false);
        ftToast(error.message);
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
          Login
        </Heading>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            variant="filled"
            placeholder="steve@apple.com"
            {...register("email", {
              required: "メールアドレスは必須入力です",
              pattern: rules.email,
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
                pattern: rules.password,
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
            isLoading={isLoading}
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
