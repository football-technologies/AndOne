import { FtLargeButton } from "@/components/ui/FtButton";
import useFtToast from "@/components/ui/FtToast";
import scheme from "@/helpers/scheme";
import { auth } from "@/plugins/firebase";
import { ftCreateId } from "@/plugins/mixin";
import rules from "@/plugins/validation";
import { signup } from "@/store/account";
import { createSecret } from "@/store/secret";
import { create } from "@/store/user";
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
  Text,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";

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
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (auth) => {
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

        ftToast("????????????????????????????????????");

        setIsLoading(false);

        router.push("/");
      })
      .catch((error) => {
        ftToast(error.message);
        setIsLoading(false);
      });
  };

  return (
    <Box h="100vh" w="400px" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading py="50px" as="h3" size="lg">
          Signup
        </Heading>
        <FormControl isInvalid={errors.name}>
          <FormLabel>User Name</FormLabel>
          <Input
            type="name"
            variant="filled"
            placeholder="??????taro1234"
            {...register("name", {
              required: "User Name?????????????????????",
              pattern: rules.name,
            })}
          />
          <Text fontSize="sm" pt="2" color="darkGray">
            ?????????????????????????????????????????????
          </Text>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email} mt="45px">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            variant="filled"
            placeholder="??????steve@apple.com"
            {...register("email", {
              required: "??????????????????????????????????????????",
              pattern: rules.email,
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password} mt="45px">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              variant="filled"
              placeholder="??????xxxxxx"
              {...register("password", {
                required: "????????????????????????????????????",
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

          <Text fontSize="sm" pt="2" color="darkGray">
            8???????????????????????????????????????
          </Text>

          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword} mt="45px">
          <FormLabel>Password???????????????</FormLabel>
          <InputGroup>
            <Input
              type={showConfirm ? "text" : "password"}
              variant="filled"
              placeholder="??????xxxxxx"
              {...register("confirmPassword", {
                required: "????????????????????????????????????????????????????????????",
                validate: (value) => {
                  return (
                    value === getValues("password") ||
                    "????????????????????????????????????"
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
        <VStack mt="20px">
          <FtLargeButton
            colorScheme="pink"
            type="submit"
            isLoading={isLoading}
            mt="20px"
          >
            ????????????????????????
          </FtLargeButton>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
