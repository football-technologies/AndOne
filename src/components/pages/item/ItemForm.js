import { useRouter } from "next/router";
import { useEffect, useState, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
  Box,
  Input,
  VStack,
  Textarea,
  HStack,
  Stack,
  Text,
  Image,
  Wrap,
  WrapItem,
  AspectRatio,
} from "@chakra-ui/react";

import useFtToast from "@/components/ui/FtToast";
import { FtMiddleButtonOutlined } from "@/components/ui/FtButton";
import { ftCreateId } from "@/plugins/mixin";
import { createItem, fetchItem, updateItem } from "@/store/item";
import { createTag, deleteTag } from "@/store/tag";
import { UploadIcon, UploadMain, UploadSub } from "@/components/ui/ImageUpload";

import { db } from "@/plugins/firebase";
import { doc } from "firebase/firestore";

import _ from "lodash";
import rules from "@/plugins/validation";
import scheme from "@/helpers/scheme";

const ItemForm = () => {
  const [iconUrl, setIconUrl] = useState(null);
  const [subUrls, setSubUrl] = useState([
    { key: 0, url: null, caption: null },
    { key: 1, url: null, caption: null },
    { key: 2, url: null, caption: null },
    { key: 3, url: null, caption: null },
    { key: 4, url: null, caption: null },
    { key: 5, url: null, caption: null },
    { key: 6, url: null, caption: null },
    { key: 7, url: null, caption: null },
  ]);
  const [mainUrl, setMainUrl] = useState(null);
  const [submitType, setSubmitType] = useState(null);
  const [tags, setTags] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const currentUser = useSelector((state) => state.account);
  const bindItem = useSelector((state) => state.item.item);


  const router = useRouter();

  console.log(">>>>>> init router.query", router.query);

  useEffect(() => {
    console.log(">>>>>> useEffect", router.query);
    if (router.isReady) {
      console.log(">>>>>> useEffect is Ready:", router.query);
    }
  }, [router.isReady]);

  return (
    <>
      <div>ItemForm</div>
    </>
  );
};

export default ItemForm;
