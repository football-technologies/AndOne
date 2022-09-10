import { forwardRef, useState, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { createComment } from "@/store/comment";
import { ftCreateId } from "@/plugins/mixin";
import useFtToast from "../ui/FtToast";

import { db } from "@/plugins/firebase";
import { doc } from "firebase/firestore";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Box,
} from "@chakra-ui/react";

import scheme from "@/helpers/scheme";
import _ from "lodash";

const DialogItemComment = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState("");
  const bindItem = useSelector((state) => state.item.item);
  const bindComments = useSelector((state) => state.comment.comments);
  const currentUser = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const router = useRouter();
  const itemId = router.query.itemId;

  const { ftToast } = useFtToast();

  useImperativeHandle(ref, () => ({
    openDialog() {
      setDialog(true);
    },
  }));

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
    comment.user.icon = currentUser.icon;

    dispatch(createComment(comment));
    ftToast("質問を送信しました");
    onClose();
  };

  const onClose = () => {
    setDialog(false);
  };

  return (
    <Modal isOpen={dialog} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>質問する</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Textarea onChange={onChange}></Textarea>
        </ModalBody>

        {bindComments?.map((comment, index) => {
          return (
            <Box key={index}>
              <h1>{comment.text}</h1>
            </Box>
          );
        })}

        <ModalFooter>
          <Button onClick={submit}>送信する</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default DialogItemComment;
