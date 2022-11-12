import {
  IconButton,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import DiscordIcon from "../Icons/DiscordIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import TwitterIcon from "../Icons/TwitterIcon";

const SocialButton = ({
  children,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <IconButton
      aria-label="button"
      w={25}
      bg="gray"
      rounded="full"
      as="a"
      cursor="pointer"
      _hover={{
        bg: "darkgray",
      }}
      href={href}
    >
      {children}
    </IconButton>
  );
};

export default function SmallWithSocial() {
  const year = new Date().getFullYear();

  const flexHorizontalPos = useBreakpointValue({
    sm: "center",
    lg: "space-between",
    md: "space-between",
    base: "center",
  });

  return (
    <Flex
      color="gray.200"
      justifyContent={flexHorizontalPos}
      wrap="wrap"
      alignItems="center"
      mb={4}
      mt={12}
      gap={4}
    >
      <Text align={"center"}>© {year} Dev Com PZO. All rights reserved</Text>
      <Stack direction={"row"} spacing={6}>
        <SocialButton label={"Twitter"} href="https://twitter.com/DevComPzo">
          <TwitterIcon width={20} height={20} fill="#1a202c" />
        </SocialButton>
        <SocialButton
          label={"Instagram"}
          href="https://www.instagram.com/devcompzo/"
        >
          <InstagramIcon width={20} height={20} fill="#1a202c" />
        </SocialButton>

        <SocialButton label={"Discord"} href="https://discord.gg/5jrnesAXJ7">
          <DiscordIcon width={20} height={20} fill="#1a202c" />
        </SocialButton>
      </Stack>
    </Flex>
  );
}
