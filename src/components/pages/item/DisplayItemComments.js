import { FtSmallButtonOutlined } from "@/components/ui/FtButton";

import { ToFullDate } from "@/plugins/filter";

import { Stack, HStack, Text, Textarea, Avatar } from "@chakra-ui/react";

const DisplayItemComments = ({ comment, type, replyId, selectComment }) => {
  return (
    <HStack>
      <Stack w={type === "parent" ? "15%" : "25%"} align="end">
        {comment.user.icon ? (
          <Avatar src={comment.user.icon} />
        ) : (
          <Avatar name={comment.user.name} />
        )}
      </Stack>
      <Stack w={type === "parent" ? "80%" : "70%"}>
        <Text fontSize="xs">{comment.user.name}</Text>
        <Textarea readOnly value={comment.text} resize="none"></Textarea>
        <HStack>
          {comment.createdAt && (
            <Text fontSize="xs">{ToFullDate(comment.createdAt)}</Text>
          )}

          <Stack align={"end"}>
            <FtSmallButtonOutlined onClick={() => selectComment(replyId)}>
              返信する
            </FtSmallButtonOutlined>
          </Stack>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default DisplayItemComments;
