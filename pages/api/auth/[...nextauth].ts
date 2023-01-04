import NextAuth, { Session } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
} from "../../../config/discordAPI";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<Session> {
      const { expires, user } = session;
      return { expires, user: { ...user, id: token.sub } };
    },
  },
});
