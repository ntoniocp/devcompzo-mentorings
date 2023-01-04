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
  FormControl,
  FormLabel,
  Switch,
  useBoolean,
} from "@chakra-ui/react";
import ProfileForm, { FormValues as ProfileFormValues } from "./ProfileForm";
import NotRegisteredMsg from "./NotRegisteredMsg";

import {
  useCreateMentorProfile,
  useUpdateMentorAvatar,
  useUpdateMentorProfile,
} from "../../hooks/queries/mentor";
import { useLoggedUserMentorProfile } from "../../providers/UserSessionProvider";
import { useSession } from "../../hooks/useSession";
interface Props {
  isOpen: boolean;
  onCloseClick: () => void;
}

export default function EditProfileDrawer({
  isOpen = false,
  onCloseClick,
}: Props) {
  const { data: session } = useSession();
  const { mentorData: mentorProfile } = useLoggedUserMentorProfile();

  const createMutation = useCreateMentorProfile();
  const updateMutation = useUpdateMentorProfile();
  const avatarMutation = useUpdateMentorAvatar();

  const [active, setActive] = useBoolean(false);
  const [hasClickedCreate, setHasClickedCreate] = useState(false);

  const isCreatingOrUpdatingProfile =
    createMutation.isLoading || updateMutation.isLoading;

  const handleClose = () => {
    setHasClickedCreate(false);
    onCloseClick();
  };

  const createMentorProfile = async (
    profileData: ProfileFormValues,
    avatar?: File
  ) => {
    const data = {
      ...profileData,
      tags: profileData.tags.map((t) => t.name),
      active,
      discordId: session?.user.id || "",
      discordHandle: session?.user.id || "",
    };

    createMutation.mutate(data, {
      onSuccess: () => {
        if (avatar && data.discordId) {
          avatarMutation.mutate({
            discordId: data.discordId,
            avatarFile: avatar,
          });
        }
      },
    });
  };

  const updateMentorProfile = async (
    profileData: ProfileFormValues,
    avatar?: File
  ) => {
    const discordId = mentorProfile?.discordId || "";

    const newData = {
      ...profileData,
      tags: profileData.tags.map((t) => t.name),
      active,
    };

    updateMutation.mutate(
      { discordId, newData },
      {
        onSuccess: () => {
          if (avatar) {
            avatarMutation.mutate({ discordId, avatarFile: avatar });
          }
        },
      }
    );
  };

  useEffect(() => {
    if (mentorProfile && !mentorProfile.active) {
      setActive.off();
    } else {
      setActive.on();
    }
  }, [mentorProfile, setActive]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
      <DrawerOverlay bg="rgba(255, 255, 255, 0.05)" />
      <DrawerContent bg="#25282f">
        <DrawerCloseButton onClick={handleClose} color="white" />
        {mentorProfile && (
          <DrawerHeader color="white">Edita tu perfil</DrawerHeader>
        )}

        <DrawerBody px={10}>
          {!hasClickedCreate && !mentorProfile ? (
            <NotRegisteredMsg
              onRegisterClick={() => setHasClickedCreate(true)}
            />
          ) : (
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
                initialValues={mentorProfile}
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

        {(hasClickedCreate || mentorProfile) && (
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
