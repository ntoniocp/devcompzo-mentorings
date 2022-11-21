import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  requestAllMentors,
  requestMentorByDiscordId,
  requestMentorCreation,
  requestMentorUpdate,
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
    select: (res) => res.data?.data,
  });
};

export const useMentorProfile = (
  discordId: string,
  options?: Parameters<typeof useQuery>[2]
) => {
  return useQuery<Mentor>(
    [queryKeyBase, discordId],
    () => requestMentorByDiscordId(discordId).then((res) => res.data.data),
    {
      ...(options as any),
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
    ({
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
