import Image from "next/image";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

interface Props {
  onRegisterClick: () => void;
}

export default function NotRegisteredMsg({
  onRegisterClick = () => null,
}: Props) {
  return (
    <Flex
      flexDirection="column"
      height="100%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Image
        src="/illustrations/mentor_drawer_illustration.svg"
        alt="people collaborating illustration"
        layout="fixed"
        width={150}
        height={150}
      />
      <Heading color="gray.200" size="lg" mb={6} mt={4}>
        Únete al grupo de voluntarios
      </Heading>
      <Text color="gray.300">
        Parece que aún no has registrado tu perfil de Mentor pero nos encantaría
        que te nos unas.
      </Text>
      <Text size="sm" color="purple.100" my={2}>
        Si estás en busca de ayuda puedes ignorar esta opción
      </Text>
      <Button
        borderWidth={1}
        borderColor="purple.400"
        bg="transparent"
        color="purple.400"
        minWidth={152}
        _hover={{
          bg: "gray.700",
        }}
        _focus={{
          bg: "gray.700",
        }}
        _active={{
          bg: "gray.700",
        }}
        my={6}
        onClick={onRegisterClick}
      >
        Crear mi perfil de Mentor
      </Button>
    </Flex>
  );
}
