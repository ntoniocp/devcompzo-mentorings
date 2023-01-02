import { useState } from "react";
import { Avatar, AvatarProps, Box, Flex, StyleProps } from "@chakra-ui/react";
import CameraIcon from "../Icons/CameraIcon";
import {
  ImageOriginSelectionModal,
  ImageMeta,
} from "./ImageOriginSelectionModal";

interface Props extends StyleProps {
  avatarProps?: AvatarProps;
  onChange?: ({
    imageUrl,
    imageFile,
  }: {
    imageUrl?: string;
    imageFile?: File;
    imageFilePreviewSrc?: string;
  }) => void;
  disabled?: boolean;
}

export function AvatarSelector({
  avatarProps,
  onChange = () => null,
  disabled = false,
  ...styleProps
}: Props) {
  const [isSelectingImageOrigin, setIsSelectingImageOrigin] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleClick = () => {
    if (!disabled) setIsSelectingImageOrigin(true);
  };

  const handleImageSelection = (imageMeta: ImageMeta) => {
    if (imageMeta.origin === "local") {
      setSelectedImage(imageMeta.imagePreviewSrc);
      onChange({
        imageFile: imageMeta.image,
        imageFilePreviewSrc: imageMeta.imagePreviewSrc,
      });
    }

    if (imageMeta.origin === "discord") {
      setSelectedImage(imageMeta.avatarUrl);
      onChange({ imageUrl: imageMeta.avatarUrl });
    }

    setIsSelectingImageOrigin(false);
  };

  return (
    <>
      <Box
        position="relative"
        width="fit-content"
        height="fit-content"
        cursor="pointer"
        {...styleProps}
      >
        <Avatar as="span" src={selectedImage} {...avatarProps} />
        <Flex
          justifyContent="center"
          alignItems="center"
          position="absolute"
          rounded="full"
          top="0"
          left="0"
          height="100%"
          width="100%"
          bg="transparent"
          opacity="0"
          transition="0.1s ease-in all"
          _hover={
            disabled
              ? undefined
              : {
                  bg: "purple.100",
                  opacity: 1,
                }
          }
          onClick={handleClick}
        >
          <CameraIcon width={25} fill="gray.300" />
        </Flex>
      </Box>
      <ImageOriginSelectionModal
        isOpen={isSelectingImageOrigin}
        onClose={() => setIsSelectingImageOrigin(false)}
        onImageOriginSave={handleImageSelection}
      />
    </>
  );
}
