import DisplayItemComments from "./DisplayItemComments";
import {
  FtMiddleButtonOutlined,
  FtSmallButton,
} from "@/components/ui/FtButton";
import useFtToast from "@/components/ui/FtToast";
import scheme from "@/helpers/scheme";
import { db } from "@/plugins/firebase";
import { ftCreateId } from "@/plugins/mixin";
import { createComment } from "@/store/comment";
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
} from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

const ItemComments = () => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [replyId, setReplyId] = useState(null);
  const [comments, setComments] = useState([]);

  const [isShowInput, setIsShowInput] = useState(false);

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
  }, [bindItem.id]);

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
    if (bindComments.length === 0) {
      setIsShowInput(true);
    }
  };

  const onClose = () => {
    setDialog(false);
    setText("");
    setReplyId(null);
    setIsShowInput(false);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const selectComment = (parentId) => {
    setReplyId(parentId);
    setIsShowInput(true);
    // initialFocusRef.current.focus();
  };

  const addNewComment = () => {
    setIsShowInput(true);
  };

  const submit = () => {
    // if (isSeller && !replyId) {
    //   ftToast("??????????????????????????????????????????????????????");
    //   return false;
    // }

    if (text === "") {
      ftToast("????????????????????????????????????");
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

    // ?????????
    if (replyId) {
      comment.parent.id = replyId;
      comment.parent.ref = doc(db, `items/${itemId}/comments/${replyId}`);

      comment.shop.id = bindItem.shop.id;
      comment.shop.name = bindItem.shop.name;
      comment.shop.icon = bindItem.shop.icon;
      comment.shop.ref = doc(db, `shops/${bindItem.shop.id}`);
    }

    initialFocusRef.current.value = "";
    dispatch(createComment(comment));

    setIsShowInput(false);

    ftToast("?????????????????????????????????");
  };

  return (
    <>
      {/* Button */}
      <HStack>
        <Button
          variant="link"
          size="sm"
          mt="5"
          onClick={openDialogItemComment}
          className="underline"
        >
          <Icon as={GoCommentDiscussion} boxSize="4" mr="2"></Icon>
          {bindComments?.length > 0
            ? `${bindComments.length}?????????????????????`
            : "??????????????????????????????"}
        </Button>
      </HStack>

      {/* Dialog */}
      <Modal
        isOpen={dialog}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
        scrollBehavior={"inside"}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          {bindComments?.length > 0 && (
            <ModalHeader>
              <FtMiddleButtonOutlined onClick={addNewComment}>
                ????????????????????????
              </FtMiddleButtonOutlined>
              <Text color="primary" fontSize="xs" p="2" pb="0">
                *???????????????????????????????????????????????????????????????
              </Text>
            </ModalHeader>
          )}

          <ModalCloseButton />

          <ModalBody>
            {comments.map((parentComment, parentIndex) => {
              return (
                <Stack
                  key={parentIndex}
                  p="5"
                  borderTop="1px"
                  borderColor="lightGray"
                >
                  <DisplayItemComments
                    comment={parentComment}
                    type="parent"
                    replyId={parentComment.id}
                    selectComment={selectComment}
                  ></DisplayItemComments>

                  {parentComment.children.map((childrenComment, index) => {
                    return (
                      <DisplayItemComments
                        key={index}
                        comment={childrenComment}
                        type="children"
                        replyId={parentComment.id}
                        selectComment={selectComment}
                      ></DisplayItemComments>
                    );
                  })}
                </Stack>
              );
            })}
          </ModalBody>

          {isShowInput && (
            <ModalFooter pt="5" pb="8">
              <Textarea
                autoFocus={isShowInput}
                ref={initialFocusRef}
                rows={5}
                bg="input"
                placeholder={"????????????????????????????????????????????????????????????"}
                onChange={onChange}
                mr="5"
                fontSize="sm"
              ></Textarea>

              <Box>
                <FtSmallButton onClick={submit}>????????????</FtSmallButton>
              </Box>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemComments;
