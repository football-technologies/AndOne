import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Stack,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import { useState, forwardRef, useImperativeHandle } from "react";

const DialogImage = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState();
  const [images, setImages] = useState([]);
  const [targetIndex, setTargetIndex] = useState();

  useImperativeHandle(ref, () => ({
    openDialog({ images, index }) {
      setImages(images);
      setTargetIndex(index);
      setUrl(images[index].url);
      setDialog(true);
    },
  }));

  const onClose = () => {
    setDialog(false);
  };

  const showNextImage = ({ img, index }) => {
    setUrl(img.url);
    setTargetIndex(index);
  };

  return (
    <Modal isOpen={dialog} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent w="600px" p="5" py="10">
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="row">
            <Box w="15%">
              {images.map((img, index) => {
                return (
                  <>
                    <Box
                      p="2%"
                      pl="0"
                      border="2px"
                      borderColor={index === targetIndex ? "primary" : "white"}
                      key={index}
                      onClick={() => showNextImage({ img, index })}
                    >
                      <AspectRatio ratio={1}>
                        <Image
                          rounded="md"
                          src={img.url}
                          className="ftHover"
                        ></Image>
                      </AspectRatio>
                    </Box>
                  </>
                );
              })}
            </Box>

            <Box w="85%">
              <Image src={url}></Image>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default DialogImage;
