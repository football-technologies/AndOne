import { FtSmallButtonOutlined } from "@/components/ui/FtButton";

import { ToFullDate } from "@/plugins/filter";

import { Stack, HStack, Text, Avatar } from "@chakra-ui/react";

const DisplayItemComments = ({ comment, type, replyId, selectComment }) => {
  return (
    <HStack pl={type === "parent" ? "0" : "12"}>
      <Stack>
        <Avatar src={comment.user.icon} name={comment.user.name} />
      </Stack>

      <Stack w="100%" spacing="0">
        <Text fontSize="xs" pl="2">
          {comment.user.name}
        </Text>
        <Text
          px="5"
          py="3"
          fontSize="sm"
          rounded="2xl"
          className="nl2br"
          bg="paleGray"
        >
          {comment.text}
        </Text>

        <HStack pt="2" justify="end">
          {comment.createdAt && (
            <Text fontSize="xs">{ToFullDate(comment.createdAt)}</Text>
          )}
          <FtSmallButtonOutlined onClick={() => selectComment(replyId)}>
            返信する
          </FtSmallButtonOutlined>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default DisplayItemComments;
