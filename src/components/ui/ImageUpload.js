import { Button } from "@chakra-ui/react";

const ImageUpload = () => {
  return <>
  <input type={"file"} name="image"></input>
  <Button>submit</Button>
  </>;
};

export default ImageUpload;
