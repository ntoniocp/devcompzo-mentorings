import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  Switch,
  useBoolean,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ProfileForm, { FormValues as ProfileFormValues } from "./ProfileForm";
import NotRegisteredMsg from "./NotRegisteredMsg";
import { SessionWithDiscordId } from "../../types/auth";

import {
  useCreateMentorProfile,
  useMentorProfile,
  useUpdateMentorProfile,
} from "../../hooks/queries/mentor";

interface Props {
  isOpen: boolean;
  onCloseClick: () => void;
}

export default function EditProfileDrawer({ isOpen, onCloseClick }: Props) {
  const { data: session } = useSession();

  const {
    data: mentorProfile,
    isLoading: isCheckingProfile,
    error: profileSearchError,
    remove: removeMentorProfile,
  } = useMentorProfile((session as SessionWithDiscordId)?.user.id || "", {
    enabled: isOpen,
    retry: (failureCount, error) => {
      return (error as any).response.status === 404 ? false : failureCount < 3;
    },
  });

  const createMutation = useCreateMentorProfile();
  const updateMutation = useUpdateMentorProfile();

  const [active, setActive] = useBoolean(false);
  const [hasClickedCreate, setHasClickedCreate] = useState(false);

  const isCreatingOrUpdatingProfile =
    createMutation.isLoading || updateMutation.isLoading;

  const handleClose = () => {
    removeMentorProfile();
    setHasClickedCreate(false);
    onCloseClick();
  };

  const createMentorProfile = async (profileData: ProfileFormValues) => {
    const data = {
      ...profileData,
      tags: profileData.tags.map((t) => t.name),
      active,
      discordId: (session as SessionWithDiscordId)["user"]["id"],
      discordHandle: (session as SessionWithDiscordId)["user"]["name"] || "",
    };

    createMutation.mutate(data);
  };

  const updateMentorProfile = async (profileData: ProfileFormValues) => {
    const discordId = (session as SessionWithDiscordId)["user"]["id"] || "";

    const newData = {
      ...profileData,
      tags: profileData.tags.map((t) => t.name),
      active,
    };

    updateMutation.mutate({ discordId, newData });
  };

  const enableForm = useMemo(() => {
    // is fetching mentor profile
    if (isCheckingProfile) return false;

    // is showing message indicating user to create profile
    if (profileSearchError && !hasClickedCreate) return false;

    // if there's a mentor profile in the db or the user clicked create
    return true;
  }, [isCheckingProfile, profileSearchError, hasClickedCreate]);

  const showNotRegisteredMsg =
    !isCheckingProfile && profileSearchError && !hasClickedCreate;

  useEffect(() => {
    if (mentorProfile?.active) {
      setActive.on();
    } else {
      setActive.off();
    }
  }, [mentorProfile, setActive]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
      <DrawerOverlay bg="rgba(255, 255, 255, 0.05)" />
      <DrawerContent bg="#25282f">
        <DrawerCloseButton onClick={handleClose} color="white" />
        {!isCheckingProfile && mentorProfile && (
          <DrawerHeader color="white">Edita tu perfil</DrawerHeader>
        )}

        <DrawerBody px={10}>
          {isCheckingProfile && (
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Spinner
                size="xl"
                color="purple.500"
                thickness="4px"
                speed="0.4s"
              />
            </Flex>
          )}
          {showNotRegisteredMsg && (
            <NotRegisteredMsg
              onRegisterClick={() => setHasClickedCreate(true)}
            />
          )}
          {enableForm && (
            <>
              <FormControl display="flex" alignItems="center" mb={9} mt={2}>
                <Switch
                  id="active"
                  colorScheme="purple"
                  isChecked={active}
                  onChange={setActive.toggle}
                />
                <FormLabel
                  htmlFor="active"
                  color="gray.100"
                  ml={2}
                  mb={0}
                  cursor="pointer"
                >
                  Mostrarme en la lista
                </FormLabel>
              </FormControl>
              <ProfileForm
                initialValues={mentorProfile || undefined}
                formId="profile-form"
                onSubmit={
                  hasClickedCreate && !mentorProfile
                    ? createMentorProfile
                    : updateMentorProfile
                }
                disableAllFields={!active || isCreatingOrUpdatingProfile}
              />
            </>
          )}
        </DrawerBody>

        {enableForm && (
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={handleClose}
              color="white"
              border="none"
              fontWeight="400"
            >
              Descartar
            </Button>
            <Button
              bg="purple.500"
              color="white"
              type="submit"
              form="profile-form"
              disabled={isCreatingOrUpdatingProfile}
            >
              Guardar cambios
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
