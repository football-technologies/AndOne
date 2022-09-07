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
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const SubImagesInput = ({ images, returnImages }) => {
  const imageInputRefs = useRef([]);
  const [newImages, setNewImages] = useState(images);
  const bindShop = useSelector((state) => state.shop.shop);

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
        {[...Array(9)].map((_, index) => {
          return (
            <Box key={index} w="31%" p="1%" position="relative">
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
                folderPath={`shops/${bindShop.id}/sub/${index}`}
              ></UploadSub>
            </Box>
          );
        })}
      </Wrap>
    </>
  );
};

export default SubImagesInput;
