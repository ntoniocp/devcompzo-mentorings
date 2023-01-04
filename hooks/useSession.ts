import { Session } from "next-auth";
import { useSession as useNextAuthSession } from "next-auth/react";
import { SessionWithDiscordId } from "../types/auth";

type TypedSession = Session & {
  data: SessionWithDiscordId | null;
  status: any;
};

export function useSession() {
  return useNextAuthSession() as TypedSession;
}
