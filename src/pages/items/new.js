import React from "react";
import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Icon,
  Wrap,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { useForm } from "react-hook-form";
import rules from "@/plugins/validation";
import scheme from "@/helpers/scheme";
import { ftCreateId } from "@/plugins/mixin";

import { FtLargeButton } from "@/components/ui/FtButton";

const ItemNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(">>>>>>>>>>>>>> data", data);
  };

  const addPhoto = () => {
    console.log(">>>>>> add photo");
  };

  return (
    <>
      <Container id="ftBasicForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box w="600px" mx="auto" border="1px">
            <Box className="imagesBlock">
              <FormLabel>Item Images</FormLabel>
              <Wrap spacing="4%">
                {[...Array(8)].map((_, index) => {
                  return (
                    <Box
                      w="21%"
                      border="1px"
                      borderColor="lightGray"
                      p="5"
                      rounded="lg"
                      className="ftHover"
                      _hover={{ bg: "hover" }}
                      onClick={addPhoto}
                      key={index}
                    >
                      <AspectRatio ratio={1}>
                        <Icon as={MdOutlineAddPhotoAlternate}></Icon>
                      </AspectRatio>
                    </Box>
                  );
                })}
              </Wrap>
            </Box>

            <Box className="titleBlock">
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
            </Box>

            <Box className="submitBlock">
              <FtLargeButton
                colorScheme="pink"
                type="submit"
                isLoading={isSubmitting}
                mt={"20px"}
              >
                アカウントを作成
              </FtLargeButton>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default ItemNew;
