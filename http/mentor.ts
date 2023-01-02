import { httpClient } from "../config/httpClient";
import { ENDPOINTS } from "./endpoints";
import {
  Mentor,
  CreatableMentorData,
  EditableMentorData,
} from "../types/mentor";

export async function requestMentorByDiscordId(discordId: string) {
  const URL = `${ENDPOINTS.mentors}/${discordId}`;
  return httpClient<{ data: Mentor }>(URL);
}

export async function requestMentorCreation(data: CreatableMentorData) {
  const URL = `${ENDPOINTS.mentors}`;
  return httpClient<{ data: Mentor }>(URL, { body: data, method: "POST" });
}

export async function requestMentorUpdate(
  discordId: string,
  data: EditableMentorData
) {
  const URL = `${ENDPOINTS.mentors}/${discordId}`;
  return httpClient<{ data: Mentor }>(URL, { body: data, method: "PUT" });
}

export async function requestAllMentors() {
  const URL = `${ENDPOINTS.mentors}`;
  return httpClient<{ data: Mentor[] }>(URL);
}

export async function requestMentorsAvatarUpdate(
  discordId: string,
  avatar: File
) {
  const URL = `${ENDPOINTS.mentors}/${discordId}/avatar`;
  const fd = new FormData();
  fd.append("avatar", avatar);

  return httpClient<{ imageUrl: string }>(URL, { method: "POST", body: fd });
}
