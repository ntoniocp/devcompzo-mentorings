import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import DiscordIcon from "../../components/Icons/DiscordIcon";
import UserMenu from "../../components/UserMenu";
import { signIn, signOut } from "next-auth/react";
import { useLoggedUserMentorProfile } from "../../providers/UserSessionProvider";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  {
    label: "Acerca de",
    href: "/",
  },
  {
    label: "Mentores",
    href: "/mentors",
  },
];

export default function Navbar() {
  const { push, pathname } = useRouter();
  const { data: session } = useSession();
  const { mentorData } = useLoggedUserMentorProfile();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box cursor="pointer" onClick={() => push("/")}>
        <Image
          src="/logos/black-horizontal.svg"
          alt="dev com pzo logo"
          height={100}
          width={170}
        />
      </Box>
      <Wrap as="nav" justify="right" align="center" flexGrow={1} spacing={6}>
        {NAV_LINKS.map(({ href, label }: NavLink) => (
          <WrapItem key={href}>
            <Link href={href} passHref>
              <ChakraLink
                color="white"
                textDecor={pathname === href ? "underline" : "none"}
              >
                {label}
              </ChakraLink>
            </Link>
          </WrapItem>
        ))}
        <WrapItem>
          {session ? (
            <UserMenu
              userData={{
                name: mentorData?.fullName || "",
                image: mentorData?.pictureUrl,
              }}
              onSignOut={() => signOut()}
            />
          ) : (
            <Button
              colorScheme="purple"
              leftIcon={<DiscordIcon />}
              rounded="full"
              onClick={() => signIn("discord")}
            >
              Ingresar
            </Button>
          )}
        </WrapItem>
      </Wrap>
    </Flex>
  );
}
