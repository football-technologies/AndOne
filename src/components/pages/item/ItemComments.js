import { useState, useRef, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { createComment } from "@/store/comment";
import { ftCreateId } from "@/plugins/mixin";
import useFtToast from "@/components/ui/FtToast";

import {
  FtMiddleButtonOutlined,
  FtMiddleButton,
  FtSmallButtonOutlined,
  FtSmallButton,
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
  const [isSeller, setIsSeller] = useState(false);
  const [parentComment, setParentComment] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const bindItem = useSelector((state) => state.item.item);
  const bindComments = useSelector((state) => state.comment.comments);
  const currentUser = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const router = useRouter();
  const initialFocusRef = useRef(null);

  const itemId = router.query.itemId;

  useEffect(() => {
    if (currentUser.shopId === bindItem.shop.id) {
      setIsSeller(true);
    }
  }, []);

  const { ftToast } = useFtToast();

  const openDialogItemComment = () => {
    setDialog(true);
  };

  const onClose = () => {
    setDialog(false);
    setEditMode(false);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const selectComment = (comment) => {
    setEditMode(true);
    setParentComment(comment);
    initialFocusRef.current.focus();
  };

  const cancelComment = (comment) => {
    setEditMode(false);
    setParentComment(null);
  };

  const submit = () => {
    if (isSeller && !parentComment) {
      ftToast("返信したいコメントを選択してください");
      return false;
    }

    if (text === "") {
      ftToast("空欄のまま送信できません");
      return false;
    }

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

    // 返信用
    if (isSeller && parentComment) {
      comment.parent.id = parentComment.parent.id;
      comment.parent.ref = doc(
        db,
        `items/${itemId}/comments/${parentComment.parent.id}`
      );
    }

    // 返信用
    if (!isSeller && parentComment) {
      comment.parent.id = parentComment.parent.id;
      comment.parent.ref = doc(
        db,
        `items/${itemId}/comments/${parentComment.parent.id}`
      );
    }

    // 新規作成
    if (!isSeller && !parentComment) {
      comment.parent.id = comment.id;
      comment.parent.ref = doc(db, `items/${itemId}/comments/${comment.id}`);
    }

    console.log(comment);
    dispatch(createComment(comment));
    ftToast("送信が完了しました");
    onClose();
  };

  return (
    <>
      <HStack>
        {isSeller ? (
          <FtMiddleButton onClick={openDialogItemComment}>
            返信する
          </FtMiddleButton>
        ) : (
          <FtMiddleButton onClick={openDialogItemComment}>
            質問する
          </FtMiddleButton>
        )}

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
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          {isSeller ? (
            <ModalHeader>返信する</ModalHeader>
          ) : (
            <ModalHeader>質問する</ModalHeader>
          )}

          <ModalCloseButton />

          <ModalBody>
            <Textarea
              ref={initialFocusRef}
              placeholder={
                isSeller
                  ? "返答を入力してください"
                  : "質問事項を記入してください"
              }
              onChange={onChange}
            ></Textarea>

            <Box my={"15px"} textAlign={"end"}>
              {isSeller ? (
                <FtMiddleButton onClick={submit}>返信する</FtMiddleButton>
              ) : (
                <FtMiddleButton onClick={submit}>送信する</FtMiddleButton>
              )}
            </Box>

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
                    {comment.user.icon ? (
                      <Avatar src={comment.user.icon} />
                    ) : (
                      <Avatar name={comment.user.name} />
                    )}
                  </Stack>

                  <Stack w={"80%"}>
                    <Textarea
                      readOnly
                      value={comment.text}
                      resize={"none"}
                    ></Textarea>
                    <HStack>
                      {comment.createdAt && (
                        <Text fontSize="xs">
                          {ToFullDate(comment.createdAt)}
                        </Text>
                      )}

                      <Stack align={"end"}>
                        {editMode ? (
                          <FtSmallButton onClick={() => cancelComment(comment)}>
                            返信中...
                          </FtSmallButton>
                        ) : (
                          <FtSmallButtonOutlined
                            onClick={() => selectComment(comment)}
                          >
                            返信する
                          </FtSmallButtonOutlined>
                        )}
                      </Stack>
                    </HStack>
                  </Stack>
                </HStack>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemComments;
