import { Session } from "next-auth";

export type UserWithDiscordId = Session["user"] & { id?: string };

export type SessionWithDiscordId = Session & {
  user: UserWithDiscordId;
};
