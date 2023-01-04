import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import PaperPlaneIcon from "../Icons/PaperPlaneIcon";
import { sendDiscordMessage } from "../../http/message";
import { formatDiscordMessage } from "../../utils/message";

const DEFAULT_VALUES = {
  message: "",
};

type FormValues = typeof DEFAULT_VALUES;

interface Props {
  isOpen: boolean;
  discordId: string;
  onMessageSent?: (discordId: string, message: string) => void;
  onError?: (error: any) => void;
  onCloseClick?: () => void;
}

export default function ContactMentorModal({
  isOpen = true,
  discordId,
  onMessageSent = () => null,
  onError = () => null,
  onCloseClick = () => null,
}: Props) {
  const { data: session } = useSession();

  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const sendMessage = async ({ message }: FormValues) => {
    setIsSendingMsg(true);

    try {
      const signedMessage = formatDiscordMessage(
        message,
        session?.user?.name || ""
      );

      await sendDiscordMessage(discordId, signedMessage);
      onMessageSent(discordId, signedMessage);
    } catch (err) {
      onError(err);
    }

    setIsSendingMsg(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => null}>
      <ModalCloseButton color="white" onClick={onCloseClick} />
      <ModalOverlay backgroundColor="rgba(255, 255, 255, 0.09)" />
      <ModalContent
        border="1px solid #3c3c3c"
        rounded="2xl"
        boxShadow={"sm"}
        backgroundColor="rgb(37, 40, 47)"
        minHeight="500px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pt={8}
      >
        {isSendingMsg && <Spinner size="xl" color="purple.400" />}
        {!isSendingMsg && (
          <>
            <ModalCloseButton color="white" onClick={onCloseClick} />
            <form onSubmit={handleSubmit(sendMessage)}>
              <ModalBody textColor="white" textAlign="center">
                <PaperPlaneIcon
                  width={67}
                  height={55}
                  fill="#7F7B7B"
                  style={{ margin: "auto" }}
                />
                <Text mt={10} mb={8} maxWidth={350} color="gray.300">
                  Escribe un mensaje describiendo el tipo de ayuda que necesitas
                  y comenta un poco tu disponibilidad. Esta informacion llegara
                  directo al inbox del mentor en discord
                </Text>
                <Textarea
                  resize={"none"}
                  mb={3}
                  color="gray.400"
                  {...register("message", {
                    required: "Campo requerido",
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  mx="auto"
                  mb="5"
                  width="80%"
                  px="7"
                  fontSize={"xs"}
                  rounded="full"
                  bg={"purple.400"}
                  size="lg"
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
                  isFullWidth
                >
                  Contactar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
