import { useState } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ToPrice } from "@/plugins/filter";

import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Box,
  Text,
  Link,
  AspectRatio,
  Image,
  Spacer,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { FtMiddleButton } from "../ui/FtButton";

const DialogPostBidding = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState(345000);

  useImperativeHandle(ref, () => ({
    openDialog() {
      setDialog(true);
    },
  }));

  const onClose = () => setDialog(false);

  const submit = () => {
    // dispatch(create({ text, id: currentUser.id }));
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
              <Text fontSize="sm" fontWeight="700" px="10" mx="5">
                新しい入札価格
              </Text>
              <InputGroup px="10" mx="5">
                <Input
                  value={text}
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

              <Text>ToPrice: {ToPrice(text)}</Text>
              <Text>text: {text}</Text>

              {text && (
                <Text fontSize="sm" fontWeight="700" pt="10" align="center">
                  送信ボタンを押す前に確認してください！
                  <br />
                  {text}
                  {ToPrice(text)}
                  <br />
                  の入札をしようとしています。
                </Text>
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
