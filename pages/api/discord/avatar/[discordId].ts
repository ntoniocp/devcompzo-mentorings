import { Client, Intents } from "discord.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { DISCORD_BOT_TOKEN } from "../../../../config/discordAPI";
import { Error } from "../../../../types/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: any } | Error>
) {
  const { discordId } = req.query;

  if (req.method === "GET") {
    try {
      const client = new Client({
        intents: Intents.FLAGS.GUILDS,
      });

      await client.login(DISCORD_BOT_TOKEN);
      const user = await client.users.fetch(discordId as string);
      const avatarUrl = await user.avatarURL();

      res.status(200).send({ data: { avatarUrl } });
    } catch (err) {
      console.log(err);
    }
  }
}
