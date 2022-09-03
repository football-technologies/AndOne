import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";
import useFtToast from "@/components/ui/ftToast";
import { storage } from "@/plugins/firebase";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

const ImageUpload = forwardRef(({ folderPath, upload }, inputRef) => {
  const { ftToast } = useFtToast();

  const onChange = (e) => {
    const maxSize = 10000000; // 10MB未満

    const file = e.target.files[0];

    // 1. アップロードされるファイルが画像であること
    if (!file.type.includes("image")) {
      ftToast("画像ファイルのみアップロード可能です");
      return false;
    }

    // 2. 画像のサイズが10MB未満であること
    if (!(parseInt(file.size) < maxSize)) {
      ftToast("画像サイズが" +
      maxSize / 1000000 +
      "メガ以下のみアップロード可能です");
      return false;
    }

    const randomNumber = uuidv4();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const storageRef = ref(
        storage,
        `images/${folderPath}/${randomNumber}/original.jpg`
      );
      uploadString(storageRef, e.target.result, "data_url")
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(">>>>>>>>>>>> downloadURL", downloadURL);
            upload(downloadURL);
          });
        })
        .catch((err) => {
          console.log(">>>>>>>>>> err", err.message);
          toast({
            position: "top",
            title: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    };
  };

  return (
    <>
      <Input
        ref={inputRef}
        type={"file"}
        hidden
        name="image"
        onChange={onChange}
      ></Input>
    </>
  );
});

export default ImageUpload;
