import { Avatar, Badge, Button, Heading, Flex, Text } from "@chakra-ui/react";
import { getAvatarPlaceHolder } from "../../utils/avatar";
import { Mentor } from "../../types/mentor";

type Props = Omit<Mentor, "id" | "active"> & {
  onContactClick?: () => void;
  hideContactAction?: boolean;
};

export default function MentorCard({
  fullName,
  discordHandle,
  description,
  tags,
  pictureUrl,
  onContactClick = () => null,
  hideContactAction = false,
}: Props) {
  return (
    <Flex
      as="article"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      maxW={"280px"}
      w={"full"}
      bg="rgba(0, 0, 0, 0.15)"
      border="1px solid #3c3c3c"
      rounded="2xl"
      boxShadow={"sm"}
      p={6}
      textAlign={"center"}
      minWidth={280}
    >
      <div>
        <Avatar
          size={"lg"}
          src={pictureUrl || getAvatarPlaceHolder(fullName)}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"lg"} fontFamily={"body"} color="white">
          {fullName}
        </Heading>
        <Text fontSize="sm" fontWeight={600} color={"purple.600"} mb={4} mt={1}>
          {discordHandle}
        </Text>
        <Text textAlign={"center"} px={3} fontSize="sm" color="gray.200">
          {description}
        </Text>

        <Flex
          align="center"
          justify="center"
          mt={4}
          wrap="wrap"
          style={{ gap: 8 }}
        >
          {tags.map((tag) => (
            <Badge
              key={tag}
              px={2}
              bg="rgba(0, 0, 0, 0.15)"
              borderStyle="solid"
              borderWidth={1}
              borderColor="gray.600"
              color="white"
              rounded="sm"
              fontWeight={"400"}
              fontSize="xs"
              style={{ textTransform: "capitalize" }}
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      </div>

      {!hideContactAction && (
        <Flex mt={5} justifyContent="center" width="100%">
          <Button
            mt={2}
            width="60%"
            fontSize={"xs"}
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
            onClick={onContactClick}
          >
            Contactar
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
