import { useCallback, useState } from "react";
import { NextPage } from "next";
import { Flex, Heading, Input } from "@chakra-ui/react";
import ContactMentorModal from "../../components/ContactMentorModal";

import { dehydrate, QueryClient } from "react-query";
import MentorsCardsList from "../../components/MentorsCardsList";
import { Mentor } from "../../types/mentor";
import { useAllMentors } from "../../hooks/queries/mentor";
import { requestAllMentors } from "../../http/mentor";

const Mentors: NextPage = () => {
  const [discordIdToContact, setDiscordIdToContact] = useState<string>();
  const [searchText, setSearchText] = useState<string>("");
  const { data: mentors, isLoading: isLoadingMentors } = useAllMentors();

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
      </Flex>

      <MentorsCardsList
        mentors={mentors || []}
        isLoading={isLoadingMentors}
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
  await queryClient.prefetchQuery(["mentors"], requestAllMentors);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Mentors;
