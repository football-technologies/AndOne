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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { db } from "@/plugins/firebase";
import { query, collection } from "firebase/firestore";
import _ from "lodash";

const FtSearchBox = () => {
  const { ftToast } = useFtToast();
  const router = useRouter();

  const [dialog, setDialog] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  // TODO: 検索ログを使って適正なワードに変更
  const populerWords = [
    "バルセロナFC",
    "日本代表",
    "浦和レッズ",
    "プレミアリーグ",
    "マンチェスターCity",
    "香川真司",
    "イタリア代表",
    "イニエスタ",
    "ケビン・デ・ブライネ",
    "アズーリ",
  ];

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
    setDialog(true);
  };

  const onClose = () => {
    setDialog(false);
    setKeyword("");
  };

  const submit = (ev) => {
    ev.preventDefault();
    onClose();
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

            <Box pt="10">
              <Text fontWeight="700">こんな検索キーワードが人気です</Text>
              <Divider mb="5"></Divider>
              {populerWords.map((word) => {
                return <Text>{word}</Text>;
              })}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FtSearchBox;
