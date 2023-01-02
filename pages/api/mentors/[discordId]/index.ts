import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { JWT_SECRET } from "../../../../config/auth";
import { getMentorByDiscordId, updateMentor } from "../../../../lib/mentors";
import { Mentor } from "../../../../types/mentor";
import { Error } from "../../../../types/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: Mentor } | Error>
) {
  const { discordId } = req.query;

  switch (req.method) {
    case "GET": {
      try {
        const data = await getMentorByDiscordId(discordId as string);
        return res.status(200).json({ data: data });
      } catch (err: any) {
        if (err.requestResult.statusCode === 404) {
          return res.status(404).json({ message: "Mentor not found" });
        }

        return res.status(500).json({ message: err.toString() });
      }
    }
    case "PUT": {
      const tokenContent = await getToken({ req, secret: JWT_SECRET });

      if (!tokenContent || tokenContent.sub !== discordId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      try {
        await updateMentor(discordId, req.body);
        return res.status(200).json({});
      } catch (err: any) {
        if (err.requestResult.statusCode === 404) {
          return res
            .status(400)
            .json({ message: "Mentor with provided id not found" });
        }

        res.status(500).json({ message: err.toString() });
      }

      break;
    }
    default: {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}
