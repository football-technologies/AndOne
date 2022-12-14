import { FtLargeButton } from "@/components/ui/FtButton";
import useFtToast from "@/components/ui/FtToast";
import { db, auth } from "@/plugins/firebase";
import rules from "@/plugins/validation";
import { login } from "@/store/account";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getDocs,
  where,
  collection,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";

const Login = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { ftToast } = useFtToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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

        ftToast("?????????????????????????????????");
        setIsLoading(false);
        console.log(">>>>>>>> Login User Done");
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        ftToast(error.message);
      });
  };

  return (
    <Box w="400px" h="100vh" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading py="50px" as="h3" size="lg">
          Login
        </Heading>
        <FormControl isInvalid={errors.email}>
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

        <VStack mt="10">
          <FtLargeButton
            colorScheme="pink"
            type="submit"
            isLoading={isLoading}
            mt="20px"
          >
            ??????????????????
          </FtLargeButton>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
