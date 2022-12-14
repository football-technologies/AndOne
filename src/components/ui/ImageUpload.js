import LoadingSpinner from "./LoadingSpinner";
import useFtToast from "@/components/ui/FtToast";
import { storage } from "@/plugins/firebase";
import { Input, Spinner } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { forwardRef, useState } from "react";

const UploadSingleImage = forwardRef(
  ({ folderPath, uploadSingleImage, type }, singleSelectInputRef) => {
    const [isLoading, setIsLoading] = useState(false);

    const { ftToast } = useFtToast();

    const onChange = (e) => {
      setIsLoading(true);

      const maxSize = 10000000; // 10MB未満

      const file = e.target.files[0];

      // 1. アップロードされるファイルが画像であること
      if (!file.type.includes("image")) {
        ftToast("画像ファイルのみアップロード可能です");
        setIsLoading(false);
        return false;
      }

      // 2. 画像のサイズが10MB未満であること
      if (!(parseInt(file.size) < maxSize)) {
        ftToast(
          "画像サイズが" +
            maxSize / 1000000 +
            "メガ以下のみアップロード可能です"
        );
        setIsLoading(false);
        return false;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const storageRef = ref(storage, `images/${folderPath}/original.jpg`);
        uploadString(storageRef, e.target.result, "data_url")
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              uploadSingleImage({
                url: downloadURL,
                type: type,
              });
            });
            setIsLoading(false);
          })
          .catch((err) => {
            ftToast(err.message);
            setIsLoading(false);
          });
      };
    };

    return (
      <>
        <Input
          ref={singleSelectInputRef}
          type="file"
          accept=".jpg, .png"
          hidden
          name="image"
          onChange={onChange}
        ></Input>
        {type === "icon" && (
          <LoadingSpinner size="xl" isLoading={isLoading}></LoadingSpinner>
        )}
      </>
    );
  }
);

const UploadSub = forwardRef(
  ({ folderPath, returnURL, showLoading = false, index }, subRef) => {
    const [isLoading, setIsLoading] = useState(false);
    const { ftToast } = useFtToast();

    const onChange = (e) => {
      setIsLoading(true);

      const maxSize = 10000000; // 10MB未満

      const file = e.target.files[0];

      // 1. アップロードされるファイルが画像であること
      if (!file.type.includes("image")) {
        ftToast("画像ファイルのみアップロード可能です");
        // setIsLoading(false);
        return false;
      }

      // 2. 画像のサイズが10MB未満であること
      if (!(parseInt(file.size) < maxSize)) {
        ftToast(
          "画像サイズが" +
            maxSize / 1000000 +
            "メガ以下のみアップロード可能です"
        );
        setIsLoading(false);
        return false;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const storageRef = ref(storage, `images/${folderPath}/original.jpg`);
        uploadString(storageRef, e.target.result, "data_url")
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              returnURL({
                url: downloadURL,
                index: index,
              });
            });
            setIsLoading(false);
          })
          .catch((err) => {
            ftToast(err.message);
            setIsLoading(false);
          });
      };
    };

    return (
      <>
        {showLoading && isLoading && (
          <Spinner position="absolute" top="5%" left="5%" zIndex="2"></Spinner>
        )}

        <Input
          ref={subRef}
          type="file"
          accept=".jpg, .png"
          hidden
          multiple
          name="image"
          onChange={onChange}
        ></Input>
      </>
    );
  }
);

export { UploadSingleImage, UploadSub };
