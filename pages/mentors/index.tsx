import { useCallback, useState } from "react";
import { NextPage } from "next";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { getAllMentors } from "../../lib/mentors";
import ContactMentorModal from "../../components/ContactMentorModal";

import { dehydrate, QueryClient } from "react-query";
import MentorsCardsList from "../../components/MentorsCardsList";
import { Mentor } from "../../types/mentor";

const Mentors: NextPage = () => {
  const [discordIdToContact, setDiscordIdToContact] = useState<string>();
  const [searchText, setSearchText] = useState<string>("");
  const closeContactModal = () => setDiscordIdToContact(undefined);

  const filterBySearch = useCallback(
    (mentor: Mentor) => {
      const lowercasedSearch = searchText.toLowerCase();

      const tagMatch = mentor.tags.some((tag) =>
        tag.toLocaleLowerCase().includes(lowercasedSearch)
      );

      const fullNameMatch = mentor.fullName
        .toLowerCase()
        .includes(lowercasedSearch);

      const descriptionMatch = mentor.description
        .toLowerCase()
        .includes(lowercasedSearch);

      const discordHandleMatch = mentor.discordHandle
        .toLowerCase()
        .includes(lowercasedSearch);

      return (
        tagMatch || fullNameMatch || descriptionMatch || discordHandleMatch
      );
    },
    [searchText]
  );

  return (
    <>
      <Heading textAlign="center" color="white">
        Lista de mentores
      </Heading>

      {/* <form> */}
      <Flex justifyContent="center" mt={5}>
        <Input
          type="search"
          size="md"
          borderColor="#3c3c3c"
          backgroundColor="rgba(0, 0, 0, 0.15)"
          color="white"
          maxWidth="40%"
          onChange={(ev) => setSearchText(ev.target.value)}
        />
        {/* <Button
            type="submit"
            ml={2}
            bg={"purple.500"}
            color="white"
            _hover={{
              bg: "purple.600",
            }}
            _focus={{
              bg: "purple.600",
            }}
          >
            Buscar
          </Button> */}
      </Flex>
      {/* </form> */}

      <MentorsCardsList
        onContactMentorClick={(discordId) => setDiscordIdToContact(discordId)}
        filterFunct={filterBySearch}
        showActiveOnly
      />

      {discordIdToContact && (
        <ContactMentorModal
          isOpen={!!discordIdToContact}
          discordId={discordIdToContact}
          onCloseClick={closeContactModal}
          onMessageSent={closeContactModal}
        />
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("mentors", getAllMentors);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Mentors;
