import { useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { ToPrice, ToAgo } from "@/plugins/filter";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Text,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import _ from "lodash";

const DialogBiddingHistory = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
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
                <Box key={bidding.id} pt="5">
                  <Stack direction="row" align="end">
                    <Box textAlign="center">
                      {bidding.user.icon ? (
                        <Avatar src={bidding.user.icon}></Avatar>
                      ) : (
                        <Avatar name={bidding.user.name}></Avatar>
                      )}
                    </Box>
                    <Box w="200px" pl="5" pt="0">
                      <Text color="primary">{ToPrice(bidding.price)}</Text>
                      <Text fontSize="xs">{bidding.user.name}</Text>
                    </Box>

                    <Box w="100px">
                      <Text fontSize="xs" color="darkGray" align="right">
                        {ToAgo(bidding.createdAt)}
                      </Text>
                    </Box>
                  </Stack>

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
