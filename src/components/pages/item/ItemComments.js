import { FtMiddleButtonOutlined } from "@/components/ui/FtButton";
import { useRef } from "react";
import { Icon, Stack, HStack, Button, Text } from "@chakra-ui/react";
import { BiComment } from "react-icons/bi";
import DialogItemComment from "@/components/dialog/DialogItemComment";

const ItemComments = () => {
  const dialogItemComment = useRef();

  const openDialogItemComment = () => {
    dialogItemComment.current.openDialog();
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
          <Text mx={"4px"}>6</Text>
        </Button>
      </HStack>
      <DialogItemComment ref={dialogItemComment}></DialogItemComment>
    </>
  );
};

export default ItemComments;
