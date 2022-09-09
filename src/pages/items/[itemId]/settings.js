import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItem } from "@/store/item";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Input,
  VStack,
  Textarea,
  Stack,
  Text,
  Button,
  Icon,
  Container,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import _ from "lodash";
import { FtLargeButton } from "@/components/ui/FtButton";

const ItemSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { itemId } = router.query;
  const bindItem = useSelector((state) => state.item.item);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [editItem, setEditItem] = useState(null);
  const [startedDate, setStartedDate] = useState("2022-10-1");
  const [startedTime, setStartedTime] = useState("22:00");
  const [finishedDate, setfinishedDate] = useState("2022-10-1");
  const [finishedTime, setfinishedTime] = useState("22:00");

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        fetchItem({
          query: `items/${itemId}`,
          type: "fetch",
        })
      );
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindItem) {
      const _item = _.cloneDeep(bindItem);
      setEditItem(_item);
    }

    return () => {
      setEditItem(null);
    };
  }, [bindItem]);

  const onSubmit = async (data) => {
    //
  };

  return (
    <>
      {editItem && (
        <Container w="500px" mx="auto">
          <Box>
            <Stack direction="row" align="center">
              <Box w="100px">
                <AspectRatio ratio="1">
                  <Image src={editItem.images[0].url} rounded="md"></Image>
                </AspectRatio>
              </Box>
              <Text fontWeight="700" p="5">
                {editItem.name}
              </Text>
            </Stack>
          </Box>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.startedDate}>
                <FormLabel>Sales Start Date & Time</FormLabel>
                <Stack direction="row">
                  <Input
                    w="50%"
                    variant="filled"
                    placeholder="例）2022年10月1日"
                    defaultValue={startedDate}
                  />
                  <Input
                    w="20%"
                    variant="filled"
                    placeholder="例）22:00"
                    defaultValue={startedTime}
                  />
                </Stack>
                <FormErrorMessage>
                  {errors.startedDate && errors.startedDate.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.finishedDate}>
                <FormLabel>Sales Start Date & Time</FormLabel>
                <Stack direction="row">
                  <Input
                    w="50%"
                    variant="filled"
                    placeholder="例）2022年10月1日"
                    defaultValue={finishedDate}
                  />
                  <Input
                    w="20%"
                    variant="filled"
                    placeholder="例）22:00"
                    defaultValue={finishedTime}
                  />
                </Stack>
                <FormErrorMessage>
                  {errors.finishedDate && errors.finishedDate.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.startPrice}>
                <FormLabel>Start Price</FormLabel>
                <Input
                  variant="filled"
                  placeholder="例）浦和レッズ 2005年モデル Home"
                  defaultValue={editItem.sale.startPrice}
                  {...register("startPrice", {
                    required: "初期価格は必須入力です",
                  })}
                />
                <FormErrorMessage>
                  {errors.startPrice && errors.startPrice.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.floorPrice}>
                <FormLabel>Floor Price</FormLabel>
                <Input
                  variant="filled"
                  placeholder="例）浦和レッズ 2005年モデル Home"
                  defaultValue={editItem.sale.floorPrice}
                  {...register("floorPrice", {
                    required: "最低落札価格は必須入力です",
                  })}
                />
                <FormErrorMessage>
                  {errors.floorPrice && errors.floorPrice.message}
                </FormErrorMessage>
              </FormControl>

              <VStack my={"30px"}>
                <FtLargeButton colorScheme="pink" type="submit" my={"20px"}>
                  販売を開始する
                </FtLargeButton>
              </VStack>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ItemSettings;
