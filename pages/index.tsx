import type { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEditProfileDrawer } from "../components/Layouts/EditProfileDrawerLayout";

const About: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { toggle } = useEditProfileDrawer();

  const handleBeMentorClick = () => {
    if (session?.user) {
      toggle();
      router.push("/mentors");
    } else {
      signIn("discord");
    }
  };

  return (
    <Flex
      as="section"
      height="100%"
      flexDirection="column"
      justifyContent="center"
    >
      <Box mt={3}>
        <Image
          src="/illustrations/hero_illustration_gray.svg"
          alt="people collaborating illustration"
          layout="responsive"
          width={100}
          height={30}
        />
      </Box>

      <Heading color="gray.200" size="xl" textAlign="center" mt={6}>
        Acelera tu crecimiento
      </Heading>
      <Heading
        color="gray.100"
        size="sm"
        textAlign="center"
        fontWeight="regular"
        mt={4}
      >
        Ofrécete como mentor o encuentra uno para ti en nuestra lista de
        voluntarios
      </Heading>
      <Flex justifyContent="center" mt={9} style={{ gap: 10 }} wrap="wrap">
        <Button
          bg="purple.400"
          color="purple.900"
          minWidth={152}
          _hover={{
            bg: "purple.300",
          }}
          _focus={{
            bg: "purple.300",
          }}
          _active={{
            bg: "purple.300",
          }}
          onClick={() => router.push("/mentors")}
        >
          Buscar mentor
        </Button>
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
          onClick={handleBeMentorClick}
        >
          Sé mentor
        </Button>
      </Flex>
    </Flex>
  );
};

export default About;
