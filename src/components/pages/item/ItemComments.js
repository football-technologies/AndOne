import { useState, useRef, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import comment, { createComment } from "@/store/comment";
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
  const [replyId, setReplyId] = useState(null);
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
    if (bindComments) {
      const arrangeComments = [];
      const comments = _.cloneDeep(bindComments);
      const parents = _.filter(comments, (comment) => !comment.parent.id);
      const sortedParents = _.orderBy(parents, "createdAt", "desc");

      for (const parent of sortedParents) {
        const children = _.filter(comments, (comment) => {
          if (comment.parent.id === parent.id) {
            return comment;
          }
        });
        const sortedChildren = _.sortBy(children, "createdAt");
        parent["children"] = sortedChildren;
        arrangeComments.push(parent);
      }
      setComments([...arrangeComments]);
    }
  }, [bindComments]);

  const { ftToast } = useFtToast();

  const openDialogItemComment = () => {
    setDialog(true);
  };

  const onClose = () => {
    setDialog(false);
    setText(null);
    setReplyId(null);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const selectComment = (parentId) => {
    setReplyId(parentId);
    initialFocusRef.current.focus();
  };

  const submit = () => {
    if (isSeller && !replyId) {
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
    if (replyId) {
      comment.parent.id = replyId;
      comment.parent.ref = doc(db, `items/${itemId}/comments/${replyId}`);
    }

    dispatch(createComment(comment));
    ftToast("送信が完了しました");
    setText(null);
    setReplyId(null);
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
            {comments.map((parentComment, parentIndex) => {
              return (
                <Stack
                  key={parentIndex}
                  p="5px 0px 30px"
                  w="400px"
                  m="0px auto"
                  borderTop="1px"
                  borderColor="lightGray"
                >
                  <Text as="b">＜質問：{parentIndex + 1}＞</Text>
                  <HStack>
                    <Stack w="15%" align="end">
                      {parentComment.user.icon ? (
                        <Avatar src={parentComment.user.icon} />
                      ) : (
                        <Avatar name={parentComment.user.name} />
                      )}
                    </Stack>
                    <Stack w="80%">
                      <Text fontSize="xs">{parentComment.user.name}</Text>
                      <Textarea
                        readOnly
                        value={parentComment.text}
                        resize="none"
                      ></Textarea>
                      <HStack>
                        {parentComment.createdAt && (
                          <Text fontSize="xs">
                            {ToFullDate(parentComment.createdAt)}
                          </Text>
                        )}

                        <Stack align={"end"}>
                          <FtSmallButtonOutlined
                            onClick={() => selectComment(parentComment.id)}
                          >
                            返信する
                          </FtSmallButtonOutlined>
                        </Stack>
                      </HStack>
                    </Stack>
                  </HStack>

                  {parentComment.children.map((childrenComment, index) => {
                    return (
                      <HStack key={index}>
                        <Stack w="25%" align="end">
                          {childrenComment.user.icon ? (
                            <Avatar src={childrenComment.user.icon} />
                          ) : (
                            <Avatar name={childrenComment.user.name} />
                          )}
                        </Stack>
                        <Stack w="70%">
                          <Text fontSize="xs">{childrenComment.user.name}</Text>
                          <Textarea
                            readOnly
                            value={childrenComment.text}
                            resize="none"
                          ></Textarea>
                          <HStack>
                            {childrenComment.createdAt && (
                              <Text fontSize="xs">
                                {ToFullDate(childrenComment.createdAt)}
                              </Text>
                            )}

                            <Stack align={"end"}>
                              <FtSmallButtonOutlined
                                onClick={() => selectComment(parentComment.id)}
                              >
                                返信する
                              </FtSmallButtonOutlined>
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
