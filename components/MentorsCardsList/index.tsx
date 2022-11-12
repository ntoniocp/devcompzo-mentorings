import { useMemo } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useAllMentors } from "../../hooks/queries/mentor";
import { Mentor } from "../../types/mentor";
import MentorCard from "../MentorCard";
import { useSession } from "next-auth/react";

interface MentorsCardsListProps {
  onContactMentorClick?: (mentorDiscordId: string) => void;
  filterFunct?: (mentor: Mentor) => boolean;
  showActiveOnly?: boolean;
}

export default function MentorsCardsList({
  onContactMentorClick = () => null,
  filterFunct = (mentor) => true,
  showActiveOnly = false,
}: MentorsCardsListProps) {
  const { data: sessionData } = useSession();
  const { data: mentors, isFetching } = useAllMentors();

  const filteredMentors = useMemo(() => {
    let newMentors;

    if (filterFunct) {
      newMentors = mentors?.filter(filterFunct);
    }

    if (showActiveOnly) {
      newMentors = newMentors?.filter((mentor) => mentor.active);
    }

    return newMentors || [];
  }, [filterFunct, showActiveOnly, mentors]);

  if (isFetching) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight={300}>
        <Spinner size="xl" color="purple.400" />
      </Flex>
    );
  }

  return (
    <Flex
      as="section"
      mt={6}
      px={4}
      style={{ gap: 24 }}
      wrap="wrap"
      justifyContent="center"
    >
      {filteredMentors?.map((mentor: Mentor) => (
        <MentorCard
          key={mentor.id}
          {...mentor}
          onContactClick={() => onContactMentorClick(mentor?.discordId || "")}
          hideContactAction={!sessionData}
        />
      ))}
    </Flex>
  );
}
