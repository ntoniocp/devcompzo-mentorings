import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Button,
  Link as ChakraLink,
  useToken,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useLoggedUserMentorProfile } from "../../providers/UserSessionProvider";
import { useEditProfileDrawer } from "../Layouts/EditProfileDrawerLayout";
import DiscordIcon from "../Icons/DiscordIcon";
import LogOutIcon from "../Icons/LogOutIcon";
import EditIcon from "../Icons/EditIcon";

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

interface Props {
  isOpen: boolean;
  handleClose?: () => void;
}

export function NavigationDrawer({
  isOpen = false,
  handleClose = () => null,
}: Props) {
  const { pathname } = useRouter();

  const { mentorData } = useLoggedUserMentorProfile();
  const { data: sessionData } = useSession();

  const { toggle: toggleEditProfileDrawer } = useEditProfileDrawer();
  const [purple300, purple400] = useToken("colors", [
    "purple.300",
    "purple.400",
  ]);

  console.log({ purple300 });

  const handleEdit = () => {
    toggleEditProfileDrawer();
    handleClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={() => handleClose()}>
      <DrawerOverlay bg="rgba(255, 255, 255, 0.05)" />
      <DrawerContent
        bg="#25282f"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <DrawerCloseButton onClick={handleClose} color="white" />
        <DrawerHeader>
          {sessionData && (
            <>
              <Box
                mt="12"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text color="white">
                  Hola, <br /> {mentorData?.fullName ?? sessionData?.user?.name}
                </Text>
                <Avatar as="span" src={mentorData?.pictureUrl} />
              </Box>
              <Box mb="12">
                <Button
                  fontSize="sm"
                  color="purple.400"
                  variant="link"
                  onClick={handleEdit}
                  rightIcon={
                    <EditIcon
                      fill={purple400}
                      width={18}
                      style={{ marginLeft: -5 }}
                    />
                  }
                >
                  Edita tu perfil
                </Button>
              </Box>
            </>
          )}
        </DrawerHeader>

        <DrawerBody px={10} flexGrow={1}>
          <Box as="nav" mt="12">
            <Box
              as="ul"
              display="flex"
              flexDir="column"
              alignItems="center"
              color="white"
              listStyleType="none"
              gap="5"
            >
              {NAV_LINKS.map(({ href, label }: NavLink) => (
                <Link key={href} href={href} passHref>
                  <ChakraLink
                    color="white"
                    textDecor={pathname === href ? "underline" : "none"}
                    onClick={() => handleClose()}
                    as="li"
                  >
                    {label}
                  </ChakraLink>
                </Link>
              ))}
            </Box>
          </Box>
        </DrawerBody>

        <DrawerFooter display="flex" justifyContent="center">
          {sessionData ? (
            <Button
              variant="link"
              color="purple.300"
              onClick={() => signOut()}
              leftIcon={<LogOutIcon stroke={purple300} />}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Button
              colorScheme="purple"
              leftIcon={<DiscordIcon />}
              rounded="full"
              width="100%"
              onClick={() => signIn("discord")}
            >
              Ingresar
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
