import { Box, Button, Container, Stack, Input, Avatar } from "@chakra-ui/react";
import { functions } from "@/plugins/firebase";
import { httpsCallable } from "firebase/functions";
import FtUiPallet from "@/components/ui/FtUiPallet";
import { useRef, useState } from "react";
import { storage } from "@/plugins/firebase";
import {
  getDownloadURL,
  ref,
  uploadString,
} from "@firebase/storage";

const DummyIndex = ({ folderPath, newVersion }) => {
  const [url, setUrl] = useState(null);
  const inputRef = useRef();
  const onClick = () => {
    inputRef.current.click();
  };
  const onSubmit = (e) => {
    //
  };
  const onChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    setUrl("");
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // console.log(">>>>>>> アップロード処理", e.target.result);
      // setUrl(e.target.result);
      const storageRef = ref(storage, "images/original");
      uploadString(storageRef, e.target.result, "data_url")
        .then((snapshot) => {
          console.log("OK");
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(">>>>>>> downloadURL", downloadURL);
            // this.imageURL = downloadURL;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // upload();
  };

  const upload = () => {
    const storageRef = ref(storage, "images/test/v1/original.jpg");

    uploadString(storageRef, url, "data_url");

    console.log(">>>>>>> finish");
  };

  const helloOnCall = async () => {
    const hello = httpsCallable(functions, "v1-callable-hello");
    console.log(">>>>>> Start");
    const result = await hello();
    console.log(">>>>>> Return: ->", result);
  };

  return (
    <>
      <Box p="10" bg="paleGray">
        <Box>
          <h3>functions</h3>
          <Button colorScheme="red" onClick={helloOnCall}>
            Hello On Call
          </Button>
        </Box>

        <Box>
          <FtUiPallet></FtUiPallet>
        </Box>

        <Box>
          <Avatar
            src={
              "https://firebasestorage.googleapis.com/v0/b/andone-mino.appspot.com/o/images%2Foriginal?alt=media&token=e5fdd447-9a22-48bf-a520-8b69be29cd35"
            }
          ></Avatar>
          <form onSubmit={onSubmit}>
            <Input
              ref={inputRef}
              type={"file"}
              hidden
              name="image"
              onChange={onChange}
            ></Input>
            <Button onClick={onClick}>iconを変更する</Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default DummyIndex;