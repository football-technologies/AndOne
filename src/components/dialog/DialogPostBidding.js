import DisplayTimeToFinish from "@/components/pages/item/DisplayTimeToFinish";
import {
  FtLargeButton,
  FtMiddleButtonOutlined,
} from "@/components/ui/FtButton";
import useFtToast from "@/components/ui/FtToast";
import scheme from "@/helpers/scheme";
import { ToPrice } from "@/plugins/filter";
import { db } from "@/plugins/firebase";
import { currentBiddingPrice, ftCreateId } from "@/plugins/mixin";
import { createBidding } from "@/store/bidding";
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Text,
  AspectRatio,
  Image,
  Spacer,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";

const DialogPostBidding = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
  const [price, setPrice] = useState("");
  const router = useRouter();

  const bindItem = useSelector((state) => state.item.item);
  const bindBiddings = useSelector((state) => state.bidding.biddings);
  const currentUser = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const { ftToast } = useFtToast();

  useImperativeHandle(ref, () => ({
    openDialog() {
      setDialog(true);
    },
  }));

  const onClose = () => {
    setDialog(false);
    setPrice("");
  };

  const toSignupPage = () => {
    router.push("/accounts/signup");
  };

  const submit = async () => {
    if (!price) {
      ftToast("入札価格の登録は、必須です。");
      return false;
    }

    const currentPrice = currentBiddingPrice({
      biddings: bindBiddings,
      startPrice: bindItem.sale.startPrice,
    });

    if (currentPrice > Number(price)) {
      ftToast("現在の最高入札額よりも、高い価格を設定してください");
      return false;
    }

    const editBidding = _.cloneDeep(scheme.biddings);
    editBidding.id = ftCreateId("bidding");
    editBidding.price = Number(price);

    editBidding.item.id = bindItem.id;
    editBidding.item.name = bindItem.name;
    editBidding.item.ref = doc(db, `items/${bindItem.id}`);
    editBidding.shop.id = bindItem.shop.id;
    editBidding.shop.name = bindItem.shop.name;
    editBidding.shop.ref = doc(db, `shops/${bindItem.shop.id}`);
    editBidding.user.id = currentUser.id;
    editBidding.user.name = currentUser.name;
    editBidding.user.ref = doc(db, `user/${currentUser.id}`);
    editBidding.user.icon = currentUser.icon;

    await dispatch(createBidding(editBidding));

    ftToast("入札を受け付けました。");

    setPrice("");
    onClose();
  };

  return (
    <Modal isOpen={dialog} onClose={onClose}>
      <ModalOverlay />

      <ModalContent p="10">
        <ModalCloseButton />

        {currentUser.id && (
          <>
            <ModalBody>
              <Stack direction="row">
                <Box width="100px">
                  <AspectRatio ratio={1}>
                    <Image src={bindItem.images[0].url}></Image>
                  </AspectRatio>
                </Box>
                <Text>{bindItem.name}</Text>
              </Stack>

              <Box w="300px" mx="auto" pt="5">
                <Stack
                  direction="row"
                  align="end"
                  borderBottom="2px"
                  borderColor="primary"
                >
                  <Text fontSize="md" fontWeight="bold" color="primary">
                    {ToPrice(
                      currentBiddingPrice({
                        biddings: bindBiddings,
                        startPrice: bindItem.sale.startPrice,
                      })
                    )}
                  </Text>
                  <Spacer></Spacer>
                  <Box>
                    <Text fontSize="md" fontWeight="bold">
                      <DisplayTimeToFinish
                        item={bindItem}
                        isSync={true}
                      ></DisplayTimeToFinish>
                    </Text>
                  </Box>
                </Stack>

                <Box pt="10">
                  <Box w="200px" mx="auto" pl="2">
                    <Text fontSize="sm" fontWeight="700">
                      新しい入札価格
                    </Text>

                    <InputGroup>
                      <Input
                        value={price}
                        autoFocus={true}
                        type="number"
                        valiant="filled"
                        onChange={(ev) => setPrice(ev.target.value)}
                        placeholder="例） 15000"
                        bg="paleGray"
                        rounded="none"
                      />
                      <InputRightAddon
                        children="円"
                        bg="white"
                        border="none"
                      ></InputRightAddon>
                    </InputGroup>
                  </Box>

                  {price && (
                    <Box bg="darkGray" p="3" mt="10" rounded="md">
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        color="white"
                        align="center"
                      >
                        送信ボタンを押す前に確認してください！
                        <br />
                        {ToPrice(price)}
                        <br />
                        の入札をしようとしています。
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </ModalBody>

            <ModalFooter pt="10">
              <Spacer></Spacer>
              <FtLargeButton onClick={submit}>入札を送信する</FtLargeButton>
              <Spacer></Spacer>
            </ModalFooter>
          </>
        )}

        {!currentUser.id && (
          <Box py="5" textAlign="center">
            <Text textAlign="left" mb="5">
              入札に参加するには、アカウントの作成が必要になります。
            </Text>
            <FtMiddleButtonOutlined onClick={toSignupPage}>
              アカウント作成をする
            </FtMiddleButtonOutlined>
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
});

export default DialogPostBidding;
