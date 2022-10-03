import FtUiPallet from "@/components/ui/FtUiPallet";
import { functions } from "@/plugins/firebase";
import {
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
  OrderedList,
} from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";

export const DummyIndex = () => {
  return (
    <Box>
      ダミーページです。
      <DummyList />
    </Box>
  );
};

const DummyList = () => {
  return (
    <List>
      <ListItem>1</ListItem>
      <ListItem>2</ListItem>
      <ListItem>3</ListItem>
      <ListItem>4</ListItem>
      <ListItem>5</ListItem>
    </List>
  );
};

export default DummyIndex;
// const DummyIndex = () => {
//   const helloOnCall = async () => {
//     const hello = httpsCallable(functions, "v1-callable-hello");
//     console.log(">>>>>> Start");
//     const result = await hello();
//     console.log(">>>>>> Return: ->", result);
//   };

//   return;
// };

// export default DummyIndex;
