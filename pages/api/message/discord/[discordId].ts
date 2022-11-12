import { NextApiRequest, NextApiResponse } from "next";
import { Client, Intents } from "discord.js";
import { DISCORD_BOT_TOKEN } from "../../../../config/discordAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed" });
  }

  if (!req.query.discordId || !req.body.message) {
    return res.status(400).json({ message: "Invalid id or message body" });
  }

  const client = new Client({
    intents: Intents.FLAGS.GUILDS,
  });

  await client.login(DISCORD_BOT_TOKEN);

  try {
    const user = await client.users.fetch(req.query.discordId as string, {
      cache: false,
    });

    try {
      await user.send(req.body.message);
      res.status(200).send({ msg: "Message sent" });
    } catch (err) {
      res.status(500).send({ msg: "Something bad happened" });
    }
  } catch {
    return res.status(400).send({ msg: "User not found" });
  }
}
