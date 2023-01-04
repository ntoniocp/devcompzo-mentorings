import { useMemo } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { Mentor } from "../../types/mentor";
import MentorCard from "../MentorCard";
import { useSession } from "next-auth/react";

interface MentorsCardsListProps {
  mentors: Mentor[];
  isLoading?: boolean;
  onContactMentorClick?: (mentorDiscordId: string) => void;
  filterFunct?: (mentor: Mentor) => boolean;
  showActiveOnly?: boolean;
}

export default function MentorsCardsList({
  mentors,
  isLoading,
  onContactMentorClick = () => null,
  filterFunct = () => true,
  showActiveOnly = false,
}: MentorsCardsListProps) {
  const { data: sessionData } = useSession();

  const filteredMentors = useMemo(() => {
    let newMentors: Mentor[] = [];

    if (filterFunct) {
      newMentors = mentors.filter(filterFunct);
    }

    if (showActiveOnly) {
      newMentors = newMentors.filter((mentor) => mentor.active);
    }

    return newMentors || [];
  }, [filterFunct, showActiveOnly, mentors]);

  if (isLoading) {
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
      {filteredMentors.map((mentor: Mentor) => (
        <MentorCard
          key={mentor.id}
          {...mentor}
          onContactClick={() => onContactMentorClick(mentor.discordId || "")}
          hideContactAction={!sessionData}
        />
      ))}
    </Flex>
  );
}
