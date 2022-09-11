import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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
import { BiHide, BiShow } from "react-icons/bi";
import useFtToast from "@/components/ui/FtToast";

import { auth } from "@/plugins/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { create } from "@/store/user";
import { createSecret } from "@/store/secret";
import { signup } from "@/store/account";

import _ from "lodash";
import rules from "@/plugins/validation";
import scheme from "@/helpers/scheme";
import { ftCreateId } from "@/plugins/mixin";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { ftToast } = useFtToast();

  const user = _.cloneDeep(scheme.users);
  const secret = _.cloneDeep(scheme.secrets);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (auth) => {
        console.log(">>>>>>>>>>> auth.user", auth.user);

        await updateProfile(auth.user, {
          displayName: data.name,
        });

        user.id = secret.id = ftCreateId("user");
        user.authId = auth.user.uid;
        user.displayName = user.screenName = data.name;
        secret.email = data.email;

        dispatch(
          signup({
            id: user.id,
            authId: user.authId,
            email: secret.email,
            name: user.displayName,
            icon: null,
            shopId: null,
          })
        );

        dispatch(create(user));
        dispatch(createSecret(secret));

        ftToast("アカウントを作成しました");

        setIsLoading(false);

        console.log(">>>>>>>> Create User Done");
        router.push("/");
      })
      .catch((error) => {
        console.log(">>>>>>>>>>>>>> error", error.message);

        ftToast(error.message);
        setIsLoading(false);
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
            placeholder="例）taro1234"
            {...register("name", {
              required: "User Nameは必須入力です",
              pattern: rules.name,
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
            placeholder="例）steve@apple.com"
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
              placeholder="例）xxxxxx"
              {...register("password", {
                required: "パスワードは必須入力です",
                onBlur: () => {
                  if (getValues("confirmPassword")) {
                    trigger("confirmPassword");
                  }
                },
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

        <FormControl isInvalid={errors.confirmPassword} mt={"45px"}>
          <FormLabel>Password（確認用）</FormLabel>
          <InputGroup>
            <Input
              type={showConfirm ? "text" : "password"}
              variant="filled"
              placeholder="例）xxxxxx"
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
            isLoading={isLoading}
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
