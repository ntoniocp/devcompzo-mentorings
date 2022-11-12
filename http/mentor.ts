import { httpClient } from "../config/httpClient";
import { ENDPOINTS } from "./endpoints";
import {
  Mentor,
  CreatableMentorData,
  EditableMentorData,
} from "../types/mentor";

export async function requestMentorByDiscordId(discordId: string) {
  const URL = `/${ENDPOINTS.mentors}/${discordId}`;
  return httpClient.get<{ data: Mentor }>(URL);
}

export async function requestMentorCreation(data: CreatableMentorData) {
  const URL = `/${ENDPOINTS.mentors}`;
  return httpClient.post<{ data: Mentor }>(URL, data);
}

export async function requestMentorUpdate(
  discordId: string,
  data: EditableMentorData
) {
  const URL = `/${ENDPOINTS.mentors}/${discordId}`;
  return httpClient.put<{ data: Mentor }>(URL, data);
}

export async function requestAllMentors() {
  const URL = `${ENDPOINTS.mentors}`;
  return httpClient.get<{ data: Mentor[] }>(URL);
}
