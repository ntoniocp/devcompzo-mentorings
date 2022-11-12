import { Avatar, AvatarProps, Box, Flex, StyleProps } from "@chakra-ui/react";
import { useFileExplorer } from "../../hooks";
import CameraIcon from "../Icons/CameraIcon";

interface Props extends StyleProps {
  avatarProps?: AvatarProps;
  onChange?: (ev: Event) => void;
  disabled?: boolean;
}

export default function AvatarSelector({
  avatarProps,
  onChange = () => null,
  disabled = false,
  ...styleProps
}: Props) {
  const { openFileExplorer } = useFileExplorer({ eventHandler: onChange });

  const handleClick = () => {
    if (!disabled) openFileExplorer();
  };

  return (
    <Box
      position="relative"
      width="fit-content"
      height="fit-content"
      cursor="pointer"
      {...styleProps}
    >
      <Avatar {...avatarProps} />
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
  );
}
