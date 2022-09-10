import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { ToFullDate, ToPrice, ToAgo } from "@/plugins/filter";

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
  Avatar,
  Divider,
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
  const bindItem = useSelector((state) => state.item.item);
  const bindBiddings = useSelector((state) => state.bidding.biddings);

  useImperativeHandle(ref, () => ({
    openDialog() {
      setDialog(true);
    },
  }));

  const onClose = () => {
    setDialog(false);
  };

  return (
    <Modal isOpen={dialog} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="10">
        <ModalCloseButton />
        <ModalBody>
          {bindBiddings &&
            bindBiddings.map((bidding) => {
              return (
                <Box key={bidding.id} pt="5" position="relative">
                  <Stack direction="row">
                    <Box textAlign="center">
                      {bidding.user.icon ? (
                        <Avatar src={bidding.user.icon}></Avatar>
                      ) : (
                        <Avatar name={bidding.user.name}></Avatar>
                      )}
                      <Text fontSize="xs">{bidding.user.name}</Text>
                    </Box>
                    <Box pl="5" pt="3">
                      <Text color="primary">{ToPrice(bidding.price)}</Text>
                    </Box>
                  </Stack>

                  <Text
                    position="absolute"
                    bottom="0"
                    right="0"
                    p="2"
                    fontSize="xs"
                    fontColor="lightGray"
                  >
                    {/* {ToAgo(bidding.createdAt)} */}
                  </Text>

                  <Divider></Divider>
                </Box>
              );
            })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default DialogBiddingHistory;
