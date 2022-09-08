import { forwardRef, useState, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { createComment } from "@/store/comment";
import { ftCreateId } from "@/plugins/mixin";
import useFtToast from "@/components/ui/FtToast";

import {
  FtMiddleButtonOutlined,
  FtMiddleButton,
  FtSmallButtonOutlined,
} from "@/components/ui/FtButton";

import { ToFullDate } from "@/plugins/filter";

import {
  Icon,
  Box,
  Stack,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Avatar,
} from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";

import { db } from "@/plugins/firebase";
import { doc } from "firebase/firestore";

import scheme from "@/helpers/scheme";
import _ from "lodash";

const ItemComments = () => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState("");

  const bindItem = useSelector((state) => state.item.item);
  const bindComments = useSelector((state) => state.comment.comments);
  const currentUser = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const router = useRouter();
  const initialFocusRef = useRef(null);

  const itemId = router.query.itemId;

  const { ftToast } = useFtToast();

  const openDialogItemComment = () => {
    setDialog(true);
  };

  const onClose = () => {
    setDialog(false);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const submit = () => {
    const comment = _.cloneDeep(scheme.comments);

    comment.id = ftCreateId("comment");
    comment.text = text;

    comment.item.id = itemId;
    comment.item.ref = doc(db, `items/${itemId}/comments/${comment.id}`);
    comment.item.name = bindItem.name;

    comment.user.id = currentUser.id;
    comment.user.ref = doc(db, `users/${currentUser.id}`);
    comment.user.name = currentUser.name;

    dispatch(createComment(comment));
    ftToast("質問を送信しました");
    onClose();
  };

  return (
    <>
      <HStack>
        <FtMiddleButtonOutlined onClick={openDialogItemComment}>
          質問する
        </FtMiddleButtonOutlined>

        <Button
          variant="outline"
          borderWidth="1px"
          borderColor="black"
          color="black"
          fontSize="14px"
          height="2.5em"
          onClick={openDialogItemComment}
        >
          <Icon as={BiComment} />
          {bindComments?.length > 0 ? (
            <Text mx={"4px"}>{bindComments.length}</Text>
          ) : (
            <Text mx={"4px"}>0</Text>
          )}
        </Button>
      </HStack>

      {/* Dialog */}
      <Modal
        isOpen={dialog}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>質問する</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Textarea
              ref={initialFocusRef}
              placeholder="質問事項を記入してください"
              onChange={onChange}
            ></Textarea>
          </ModalBody>
          <ModalFooter>
            <FtMiddleButton onClick={submit}>送信する</FtMiddleButton>
          </ModalFooter>

          {bindComments?.map((comment, index) => {
            return (
              <HStack
                key={index}
                py={"5px"}
                borderTop={"1px"}
                borderColor={"lightGray"}
                w={"400px"}
                m={"0px auto"}
              >
                <Stack w={"10%"}>
                  {currentUser.icon ? (
                    <Avatar src={currentUser.icon} />
                  ) : (
                    <Avatar name={currentUser.name} />
                  )}
                </Stack>
                <Stack w={"60%"}>
                  {comment.createdAt && (
                    <Text fontSize="xs">{ToFullDate(comment.createdAt)}</Text>
                  )}
                  <Textarea
                    readOnly
                    value={comment.text}
                    resize={"none"}
                  ></Textarea>
                </Stack>

                {currentUser.shopId && (
                  <Stack pl={"10px"}>
                    <FtSmallButtonOutlined>返信する</FtSmallButtonOutlined>
                  </Stack>
                )}
              </HStack>
            );
          })}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemComments;
