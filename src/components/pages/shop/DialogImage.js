import { useState, forwardRef, useImperativeHandle } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  AspectRatio,
  Image,
} from "@chakra-ui/react";

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
    <Modal isOpen={dialog} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="500px" p="5">
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Image src={url}></Image>
          </Box>
          <Text fontSize="sm" pt="2">
            ここにCaptionが表示される
          </Text>
        </ModalBody>

        <ModalFooter>
          {images.map((img, index) => {
            return (
              <>
                <Box
                  w="15%"
                  p="1%"
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default DialogImage;
