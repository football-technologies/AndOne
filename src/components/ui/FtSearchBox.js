import {
  Button,
  Icon,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import useFtToast from "./FtToast";
import { useRouter } from "next/router";
import { fetchItems } from "@/store/item";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection } from "firebase/firestore";
import _ from "lodash";

const FtSearchBox = () => {
  const { ftToast } = useFtToast();
  const router = useRouter();
  const bindItems = useSelector((state) => state.item.items);
  const shuffleItems = _.shuffle(bindItems);

  console.log(">>>>>>> serach : binditems", bindItems);

  const [dialog, setDialog] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchItems({
        query: query(collection(db, "items")),
        isOnSnapshot: false,
        type: "fetch",
      })
    );
  }, [dispatch]);

  const openSearchBox = () => {
    console.log(">>>>> click openSearchBox");
    setDialog(true);
  };

  const onClose = () => {
    setDialog(false);
    setKeyword("");
  };

  const submit = (ev) => {
    ev.preventDefault();

    router.push(`/`);
    ftToast("検索機能は、今後の実装予定です。");
  };

  return (
    <>
      <Box textAlign="right">
        <Button
          colorScheme="white"
          bg="white"
          className="ftHover"
          onClick={openSearchBox}
        >
          <Icon as={MdSearch} boxSize="1.4em" mr="2" color="Gray"></Icon>
          <Text color="Gray" fontWeight="400" pr="5">
            Seach Items...
          </Text>
        </Button>
      </Box>

      {/* dialog */}
      <Modal size="2xl" isOpen={dialog} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="10">
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <form onSubmit={submit}>
                <InputGroup>
                  <Input
                    value={keyword}
                    autoFocus={true}
                    valiant="filled"
                    onChange={(ev) => setKeyword(ev.target.value)}
                    placeholder="例）イタリア代表"
                    bg="paleGray"
                    rounded="md"
                  />
                  <InputRightElement children={<MdSearch color="gray.300" />} />
                </InputGroup>
              </form>
            </Box>

            {shuffleItems && (
              <Box pt="10">
                <Text fontWeight="700">こんな検索キーワードが人気です</Text>
                <Divider mb="5"></Divider>
                {shuffleItems.map((item) => {
                  return <Text>{item.name}</Text>;
                })}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FtSearchBox;
