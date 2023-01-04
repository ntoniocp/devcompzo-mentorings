import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  Box,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { ObjectValues } from "../../types/helpers";
import useFileExplorer from "../../hooks/useFileExplorer";
import { getUserCurrentDiscordAvatar } from "../../http/discord";

const ImageOriginTypes = {
  DISCORD: "discord",
  LOCAL: "local",
} as const;

type ImageOrigin = ObjectValues<typeof ImageOriginTypes>;

type LocalImageMeta = {
  origin: "local";
  image: File;
  imagePreviewSrc: string;
};

type DiscordImageMeta = {
  origin: "discord";
  avatarUrl: string;
};

export type ImageMeta = LocalImageMeta | DiscordImageMeta;

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onImageOriginSave?: (image: ImageMeta) => void;
}

export function ImageOriginSelectionModal({
  isOpen,
  onClose = () => null,
  onImageOriginSave = () => null,
}: Props) {
  const session = useSession();

  const [isLoadingLocalPreview, setIsLoadingLocalPreview] = useState(false);
  const [localSelectedFileSrc, setLocalSelectedFileSrc] = useState<string>();

  const [isLoadingCurrentDiscordImage, setIsLoadingCurrentDiscordImage] =
    useState(false);
  const [currentDiscordImage, setCurrentDiscordImage] = useState<string>();

  const [selectedImageOrigin, setSelectedImageOrigin] = useState<ImageOrigin>();

  const { openFileExplorer, activeFiles, clearFiles } = useFileExplorer({
    eventHandler: console.log,
  });

  const resetModalStates = () => {
    setSelectedImageOrigin(undefined);
    setLocalSelectedFileSrc(undefined);
    clearFiles();
  };

  const handleClose = () => {
    resetModalStates();
    onClose();
  };

  const handleLocalImageUpload = () => {
    setSelectedImageOrigin("local");
    openFileExplorer();
  };

  const handleSaveChanges = () => {
    if (selectedImageOrigin === "local" && activeFiles) {
      onImageOriginSave({
        origin: "local",
        image: activeFiles[0],
        imagePreviewSrc: localSelectedFileSrc || "",
      });
    }

    if (selectedImageOrigin === "discord") {
      onImageOriginSave({
        origin: "discord",
        avatarUrl: session.data?.user.image || "",
      });
    }

    resetModalStates();
  };

  useEffect(() => {
    const getCurrentDiscordImageUrl = async () => {
      setIsLoadingCurrentDiscordImage(true);

      try {
        const {
          data: { avatarUrl },
        } = await getUserCurrentDiscordAvatar(session.data?.user?.id || "");

        setCurrentDiscordImage(avatarUrl);
      } catch (err) {
        console.log({ err });
      } finally {
        setIsLoadingCurrentDiscordImage(false);
      }
    };

    if (session.data) getCurrentDiscordImageUrl();
  }, [session]);

  useEffect(() => {
    if (activeFiles?.length) {
      setIsLoadingLocalPreview(true);
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setLocalSelectedFileSrc(fileReader.result?.toString());
        setIsLoadingLocalPreview(false);
      };

      fileReader.readAsDataURL(activeFiles[0]);
    }
  }, [activeFiles]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay backgroundColor="rgba(255, 255, 255, 0.09)" />
      <ModalContent
        textColor="white"
        textAlign="center"
        border="1px solid #3c3c3c"
        rounded="2xl"
        boxShadow={"sm"}
        backgroundColor="rgb(37, 40, 47)"
        minHeight="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={8}
      >
        <ModalCloseButton color="white" onClick={handleClose} />
        <Text as="h1" fontSize={20} mt={4} mb={8}>
          Selecciona la que imagen deseas utilizar
        </Text>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={6}>
          <Box
            boxSizing="border-box"
            borderWidth={1}
            borderStyle="solid"
            borderColor={
              selectedImageOrigin === "discord" ? "purple.400" : "#3c3c3c"
            }
            borderRadius={8}
            cursor="pointer"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
            minHeight={250}
            p={3}
            minWidth={320}
            onClick={() => setSelectedImageOrigin("discord")}
          >
            <Avatar src={currentDiscordImage || ""} />
            <Text fontSize={16}>Tu imagen actual de discord</Text>
          </Box>
          <Box
            boxSizing="border-box"
            borderWidth={1}
            borderStyle="solid"
            borderColor={
              selectedImageOrigin === "local" ? "purple.400" : "#3c3c3c"
            }
            borderRadius={8}
            cursor="pointer"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={4}
            minHeight={250}
            p={3}
            minWidth={320}
            onClick={handleLocalImageUpload}
          >
            <Avatar src={localSelectedFileSrc} />
            <Text fontSize={16}>Subir una imagen local</Text>
          </Box>
        </Box>

        <Button
          mt={8}
          fontSize={"sm"}
          width={200}
          rounded="full"
          bg={"purple.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 5px 5px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "purple.500",
          }}
          _focus={{
            bg: "purple.500",
          }}
          disabled={
            !selectedImageOrigin ||
            isLoadingCurrentDiscordImage ||
            isLoadingLocalPreview
          }
          _disabled={{
            bg: "gray",
          }}
          onClick={handleSaveChanges}
        >
          Guardar imagen
        </Button>
      </ModalContent>
    </Modal>
  );
}
