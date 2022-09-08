import { UploadSub } from "@/components/ui/ImageUpload";
import {
  AspectRatio,
  Image,
  Box,
  Icon,
  Wrap,
  CloseButton,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRef, useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const SubImagesInput = ({ images, returnImages, shopId, itemId }) => {
  const imageInputRefs = useRef([]);
  const [newImages, setNewImages] = useState(images);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayWidth, setDisplayWidth] = useState(null);

  useEffect(() => {
    if (shopId) {
      setDisplayImages([...Array(9)]);
      setDisplayWidth("31%");
    }

    if (itemId) {
      setDisplayImages([...Array(8)]);
      setDisplayWidth("25%");
    }
  }, []);

  const returnURL = ({ url, index }) => {
    const _newImages = _.cloneDeep(newImages);
    if (_newImages[index]) {
      _newImages.splice(index, 1, {
        caption: null,
        url,
      });
    } else {
      _newImages.push({
        caption: null,
        url,
      });
    }
    setNewImages(_newImages);
    returnImages(_newImages);
  };

  const deleteImage = (index) => {
    const _newImages = _.cloneDeep(newImages);
    _newImages.splice(index, 1);
    setNewImages(_newImages);
    returnImages(_newImages);
  };

  return (
    <>
      <Wrap spacing="0">
        {displayImages.map((_, index) => {
          return (
            <Box key={index} w={displayWidth} p="1%" position="relative">
              {newImages[index] && (
                <>
                  <CloseButton
                    position="absolute"
                    zIndex="2"
                    top="0"
                    right="0"
                    bg="whiteAlpha.800"
                    onClick={() => {
                      deleteImage(index);
                    }}
                  ></CloseButton>
                  <AspectRatio ratio={1}>
                    <Image
                      src={newImages[index].url}
                      className="ftHover"
                      border="1px"
                      borderColor="lightGray"
                      rounded="md"
                      onClick={() => {
                        imageInputRefs.current[index].click();
                      }}
                    ></Image>
                  </AspectRatio>
                </>
              )}

              {/* 画像がない場合は、iconを表示 */}
              {!newImages[index] && (
                <AspectRatio ratio={1}>
                  <Box
                    border="1px"
                    borderColor="lightGray"
                    rounded="md"
                    className="ftHover"
                  >
                    <Icon
                      as={MdOutlineAddPhotoAlternate}
                      fontSize="2xl"
                      onClick={() => {
                        imageInputRefs.current[index].click();
                      }}
                    ></Icon>
                  </Box>
                </AspectRatio>
              )}

              <UploadSub
                ref={(element) => {
                  imageInputRefs.current[index] = element;
                }}
                returnURL={returnURL}
                showLoading={true}
                index={index}
                folderPath={
                  shopId
                    ? `shops/${shopId}/sub/${index}`
                    : `items/${itemId}/sub/${index}`
                }
              ></UploadSub>
            </Box>
          );
        })}
      </Wrap>
    </>
  );
};

export default SubImagesInput;
