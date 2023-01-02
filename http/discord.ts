import { httpClient } from "../config/httpClient";
import { ENDPOINTS } from "./endpoints";

export function getUserCurrentDiscordAvatar(discordId: string) {
  const URL = `${ENDPOINTS.discordAvatar}/${discordId}`;
  return httpClient<{ data: { avatarUrl: string } }>(URL);
}
