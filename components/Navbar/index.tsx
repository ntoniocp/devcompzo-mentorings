import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import DiscordIcon from "../../components/Icons/DiscordIcon";
import UserMenu from "../../components/UserMenu";
import { signIn, signOut } from "next-auth/react";
import { useLoggedUserMentorProfile } from "../../providers/UserSessionProvider";
import HamburgerIcon from "../Icons/HamburgerIcon";
import { NavigationDrawer } from "../NavigationDrawer";

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

  const { isOpen: isOpenNavigationDrawer, onToggle: toggleNavigationDrawer } =
    useDisclosure();

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Box cursor="pointer" onClick={() => push("/")}>
          <Image
            src="/logos/black-horizontal.svg"
            alt="dev com pzo logo"
            height={100}
            width={170}
          />
        </Box>
        <Wrap
          as="nav"
          justify="right"
          align="center"
          flexGrow={1}
          spacing={6}
          sx={{ "@media (max-width: 500px)": { display: "none" } }}
        >
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

        <Button
          bg="none"
          _active={{
            bg: "none",
          }}
          _hover={{
            bg: "none",
          }}
          sx={{ "@media (min-width: 500px)": { display: "none" } }}
          onClick={toggleNavigationDrawer}
        >
          <HamburgerIcon fill="white" height={25} width={25} />
        </Button>
      </Flex>

      <NavigationDrawer
        isOpen={isOpenNavigationDrawer}
        handleClose={toggleNavigationDrawer}
      />
    </>
  );
}
