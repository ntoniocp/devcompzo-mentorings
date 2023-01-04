import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import {
  requestAllMentors,
  requestMentorByDiscordId,
  requestMentorCreation,
  requestMentorUpdate,
  requestMentorsAvatarUpdate,
} from "../../http/mentor";
import {
  CreatableMentorData,
  EditableMentorData,
  Mentor,
} from "../../types/mentor";

const queryKeyBase = "mentors";

export const useAllMentors = () => {
  return useQuery([queryKeyBase], requestAllMentors, {
    refetchOnWindowFocus: false,
    select: (res) => res.data,
  });
};

export const useMentorProfile = (
  discordId: string,
  options?: UseQueryOptions<Mentor>
) => {
  return useQuery<Mentor>(
    [queryKeyBase, discordId],
    () => requestMentorByDiscordId(discordId).then((res) => res.data),
    {
      ...options,
    }
  );
};

export const useCreateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreatableMentorData) => requestMentorCreation(data),
    {
      onSuccess: (_, params) => {
        queryClient.invalidateQueries([queryKeyBase]);
        queryClient.invalidateQueries([queryKeyBase, params.discordId]);
      },
    }
  );
};

export const useUpdateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      discordId,
      newData,
    }: {
      discordId: string;
      newData: EditableMentorData;
    }) => requestMentorUpdate(discordId, newData),
    {
      onSuccess: () => queryClient.invalidateQueries([queryKeyBase]),
    }
  );
};

export const useUpdateMentorAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      discordId,
      avatarFile,
    }: {
      discordId: string;
      avatarFile: File;
    }) => {
      return requestMentorsAvatarUpdate(discordId, avatarFile);
    },
    onSuccess: () => queryClient.invalidateQueries([queryKeyBase]),
  });
};
