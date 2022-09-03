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
import { FtMiddleButton } from "../ui/FtButton";

const DialogPostBidding = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState();

  useImperativeHandle(ref, () => ({
    openDialog() {
      setDialog(true);
    },
  }));

  const onClose = () => {
    setDialog(false);
    setText("");
  };

  const submit = () => {
    setText("");
    onClose();
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
                <Image src="https://d17x1wu3749i2y.cloudfront.net/2021/02/15/23/44/16/274ac8e2-9729-4223-9c34-4e336cacf00f/file.jpg"></Image>
              </AspectRatio>
            </Box>
            <Text>
              Nike International 2012 Black Edition
              ああああああああああああaaaaa
            </Text>
          </Stack>

          <Box w="300px" mx="auto" pt="5">
            <Stack
              direction="row"
              align="end"
              borderBottom="2px"
              borderColor="primary"
            >
              <Text fontSize="md" fontWeight="bold" color="primary">
                45,500円
              </Text>
              <Spacer></Spacer>
              <Box>
                <Text fontSize="xs" align="right">
                  残り
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  4Days + 23:12:60
                </Text>
              </Box>
            </Stack>

            <Box pt="10">
              <Box w="200px" mx="auto">
                <Text fontSize="sm" fontWeight="700">
                  新しい入札価格
                </Text>
                <InputGroup>
                  <Input
                    value={text}
                    autoFocus="true"
                    type="number"
                    valiant="filled"
                    onChange={(ev) => setText(ev.target.value)}
                    placeholder="e.g 15000"
                    bg="paleGray"
                  />
                  <InputRightAddon
                    children="円"
                    bg="darkGray"
                    color="white"
                  ></InputRightAddon>
                </InputGroup>
              </Box>

              {text && (
                <Box bg="paleGray" p="3" mt="10">
                  <Text fontSize="sm" fontWeight="700" align="center">
                    送信ボタンを押す前に確認してください！
                    <br />
                    {ToPrice(text)}
                    <br />
                    の入札をしようとしています。
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Spacer></Spacer>
          <FtMiddleButton onClick={submit}>入札を送信する</FtMiddleButton>
          <Spacer></Spacer>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default DialogPostBidding;
