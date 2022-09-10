import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { ToPrice } from "@/plugins/filter";

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
import { FtMiddleButton } from "@/components/ui/FtButton";
import { currentBiddingPrice, ftCreateId } from "@/plugins/mixin";
import { ToFinish } from "@/plugins/filter";
import { useSelector } from "react-redux";

import { createBidding } from "@/store/bidding";
import { useDispatch } from "react-redux";
import scheme from "@/helpers/scheme";
import _ from "lodash";

import { db } from "@/plugins/firebase";
import { doc } from "firebase/firestore";
import useFtToast from "@/components/ui/FtToast";

const DialogBiddingHistory = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
  const [price, setPrice] = useState();
  const bindItem = useSelector((state) => state.item.item);
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

  return (
    <Modal isOpen={dialog} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="10">
        {/* <ModalHeader>Create Your Tweet</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="row">
            <Box width="100px">
              <AspectRatio ratio={1}>
                <Image src={bindItem.images[0].url}></Image>
              </AspectRatio>
            </Box>
            <Text>{bindItem.name}</Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default DialogBiddingHistory;
