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
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    const groupingWithParentId = _.groupBy(
      bindComments,
      (comment) => comment.parent.id
    );

    const groupingWithParentIdCommentBlock =
      Object.values(groupingWithParentId);

    const newCommentsBlock = [];
    for (const groupingWithParentIdComments of groupingWithParentIdCommentBlock) {
      newCommentsBlock.push(
        _.sortBy(groupingWithParentIdComments, "createdAt")
      );
    }

    setComments([...newCommentsBlock]);
  }, [bindComments]);

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

    // 返信用BySeller
    if (isSeller && parentComment) {
      comment.parent.id = parentComment.parent.id;
      comment.parent.ref = doc(
        db,
        `items/${itemId}/comments/${parentComment.parent.id}`
      );
    }

    // 返信用ByBuyer
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

    dispatch(createComment(comment));
    ftToast("送信が完了しました");
    onClose();
  };

  return (
    <>
      {/* Button */}
      <HStack>
        <FtMiddleButton onClick={openDialogItemComment}>
          {isSeller ? "返信する" : "質問する"}
        </FtMiddleButton>

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
          <Text mx="4px">{comments.length > 0 ? bindComments.length : 0}</Text>
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
          <ModalHeader>
            {isSeller ? "返信する" : "質問する"}
            <Text color="red.300" fontSize="xs">
              *返信する場合は「返信する」の選択が必須です
            </Text>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            {comments.map((parentComments, index) => {
              return (
                <Stack
                  key={index}
                  p="5px 0px 30px"
                  w="400px"
                  m="0px auto"
                  borderTop="1px"
                  borderColor="lightGray"
                >
                  <Text as="b">＜質問：{index + 1}＞</Text>
                  {parentComments.map((comment, index) => {
                    return (
                      <HStack key={index} py="5px">
                        <Stack w={index > 0 ? "25%" : "15%"} align="end">
                          {comment.user.icon ? (
                            <Avatar src={comment.user.icon} />
                          ) : (
                            <Avatar name={comment.user.name} />
                          )}
                        </Stack>

                        <Stack w={index > 0 ? "70%" : "80%"}>
                          <Textarea
                            readOnly
                            value={comment.text}
                            resize="none"
                          ></Textarea>
                          <HStack>
                            {comment.createdAt && (
                              <Text fontSize="xs">
                                {ToFullDate(comment.createdAt)}
                              </Text>
                            )}

                            <Stack align={"end"}>
                              {editMode ? (
                                <FtSmallButton
                                  onClick={() => cancelComment(comment)}
                                >
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
                </Stack>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Textarea
              ref={initialFocusRef}
              rows={1}
              placeholder={
                isSeller
                  ? "返答を入力してください"
                  : "質問事項を記入してください"
              }
              onChange={onChange}
              mr="5px"
            ></Textarea>

            <Box>
              <FtSmallButton onClick={submit}>
                {isSeller ? "返信する" : "質問する"}
              </FtSmallButton>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemComments;
