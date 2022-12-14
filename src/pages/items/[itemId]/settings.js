import { FtLargeButton } from "@/components/ui/FtButton";
import FtDateTimePicker from "@/components/ui/FtDateTimePicker";
import useFtToast from "@/components/ui/FtToast";
import { fetchItem, updateItem } from "@/store/item";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Input,
  Stack,
  Text,
  Container,
  AspectRatio,
  Image,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
} from "@chakra-ui/react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { ImCoinYen } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";

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

  const initStartedTime = moment()
    .startOf("day")
    .add(1, "d")
    .add(10, "h")
    .toDate();
  const initFinishedTime = moment()
    .startOf("day")
    .add(2, "d")
    .add(21, "h")
    .toDate();
  const [startedDate, setStartedDate] = useState(initStartedTime);
  const [finishedDate, setFinishedDate] = useState(initFinishedTime);

  const { ftToast } = useFtToast();

  useEffect(() => {
    if (router.isReady) {
      dispatch(
        fetchItem({
          query: `items/${itemId}`,
          isOnSnapshot: true,
          type: "fetch",
        })
      );

      return () => {
        dispatch(
          fetchItem({
            query: `items/${itemId}`,
            isOnSnapshot: true,
            type: "delete",
          })
        );
      };
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bindItem) {
      const _item = _.cloneDeep(bindItem);
      setEditItem(_item);

      if (_item.sale.startedAt) {
        setStartedDate(moment.unix(_item.sale.startedAt.seconds).toDate());
      }
      if (_item.sale.finishedAt) {
        setFinishedDate(moment.unix(_item.sale.finishedAt.seconds).toDate());
      }
    }

    return () => {
      setEditItem(null);
    };
  }, [bindItem]);

  const onSubmit = async (data) => {
    if (startedDate >= finishedDate) {
      ftToast("?????????????????????????????????????????????????????????????????????");
      return false;
    }

    await dispatch(
      updateItem({
        id: editItem.id,
        itemStatus: 3,
        sale: {
          startPrice: Number(data.startPrice),
          floorPrice: Number(data.floorPrice),
          startedAt: moment(startedDate).toDate(),
          finishedAt: moment(finishedDate).toDate(),
        },
      })
    );

    ftToast("item?????????????????????");
    router.push(`/items/${editItem.id}`);
  };

  return (
    <>
      {editItem && (
        <Container pt="10">
          <Box w="500px" mx="auto" border="1px" borderColor="lightGray">
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

          <Box ml="35%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isRequired
                pt="5"
                pl="2"
                isInvalid={errors.StartedDate}
              >
                <FormLabel>StartedDate</FormLabel>
                <FtDateTimePicker
                  showTimeSelect
                  selected={startedDate}
                  onChange={(date) => setStartedDate(date)}
                ></FtDateTimePicker>{" "}
              </FormControl>

              <FormControl
                isRequired
                pt="5"
                pl="2"
                isInvalid={errors.FinishedDate}
              >
                <FormLabel>FinishedDate</FormLabel>
                <FtDateTimePicker
                  showTimeSelect
                  selected={finishedDate}
                  onChange={(date) => setFinishedDate(date)}
                ></FtDateTimePicker>
              </FormControl>

              <FormControl pt="5" pl="2" isInvalid={errors.startPrice}>
                <FormLabel>
                  Start Price
                  <Text
                    display="inline-block"
                    pl="2"
                    fontSize="sm"
                    color="darkGray"
                  >
                    ????????????
                  </Text>
                </FormLabel>
                <InputGroup w="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<ImCoinYen color="gray.300" />}
                  />
                  <Input
                    variant="filled"
                    rounded="none"
                    placeholder="??? 15000"
                    defaultValue={editItem.sale.startPrice}
                    {...register("startPrice", {
                      required: "?????????????????????????????????",
                    })}
                  />
                  <InputLeftAddon
                    children="???"
                    bg="gray.100"
                    border="0"
                    rounded="none"
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.startPrice && errors.startPrice.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl pt="5" pl="2" isInvalid={errors.floorPrice}>
                <FormLabel>
                  Floor Price{" "}
                  <Text
                    display="inline-block"
                    pl="2"
                    fontSize="sm"
                    color="darkGray"
                  >
                    ??????????????????
                  </Text>
                </FormLabel>

                <InputGroup w="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<ImCoinYen color="gray.300" />}
                  />
                  <Input
                    variant="filled"
                    rounded="none"
                    placeholder="??? 15000"
                    defaultValue={editItem.sale.floorPrice}
                    {...register("floorPrice", {
                      required: "???????????????????????????????????????",
                    })}
                  />
                  <InputLeftAddon
                    children="???"
                    bg="gray.100"
                    border="0"
                    rounded="none"
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.floorPrice && errors.floorPrice.message}
                </FormErrorMessage>
              </FormControl>

              <FtLargeButton colorScheme="pink" type="submit" mt="10">
                ?????????????????????
              </FtLargeButton>
            </form>
          </Box>
          <Box ml="15%">
            <Text mb="30px" color="red.400">
              *??????
            </Text>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ItemSettings;
