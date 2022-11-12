import { httpClient } from "../config/httpClient";
import { ENDPOINTS } from "./endpoints";

export function sendDiscordMessage(to: string, message: string) {
  const URL = `${ENDPOINTS.message}/discord/${to}`;
  const data = { message };
  return httpClient.post(URL, data);
}
