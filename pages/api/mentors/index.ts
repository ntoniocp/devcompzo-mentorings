import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { JWT_SECRET } from "../../../config/auth";
import { createMentor, getAllMentors } from "../../../lib/mentors";
import { Mentor } from "../../../types/mentor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: Mentor[] | Mentor; message?: string }>
) {
  switch (req.method) {
    case "GET": {
      try {
        const data = await getAllMentors();
        return res.status(200).json({ data });
      } catch (err) {
        return res.status(500).json({ message: err as string });
      }
    }
    case "POST": {
      const tokenContent = await getToken({ req, secret: JWT_SECRET });

      if (!tokenContent || tokenContent.sub !== req.body.discordId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      try {
        const data: any = await createMentor(req.body);
        return res.status(200).json({ data });
      } catch (err) {
        return res.status(500).json({ message: err as string });
      }
    }
    default: {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}
