import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { JWT_SECRET } from "../../../../config/auth";
import { updateMentor } from "../../../../lib/mentors";
import { Error } from "../../../../types/api";
import { uploadMentorAvatar } from "../../../../lib/images";

const formidable = require("formidable");
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg?: String } | Error>
) {
  const { discordId } = req.query;

  switch (req.method) {
    case "POST": {
      const tokenContent = await getToken({ req, secret: JWT_SECRET });

      if (!tokenContent || tokenContent.sub !== discordId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const form = new formidable.IncomingForm();
      form.keepExtensions = true;

      await form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          return res
            .status(500)
            .send({ msg: "Error while parsing the multipart/form-data" });
        }

        if (files.avatar) {
          try {
            const mimeType = files.avatar.mimetype;
            const encodedFileStr = fs.readFileSync(files.avatar.filepath, {
              encoding: "base64",
            });
            const base64String = `data:${mimeType};base64,${encodedFileStr}`;
            const { image_url } = await uploadMentorAvatar(
              base64String,
              discordId
            );

            await updateMentor(discordId, { pictureUrl: image_url ?? "" });

            return res.status(200).send({ msg: image_url ?? "" });
          } catch (err) {
            return res.status(500).send({
              msg: "Something wrong happened during the image upload or profile update",
            });
          }
        }
      });

      break;
    }
    default: {
      return res.status(405).send({ message: "Method not allowed" });
    }
  }
}
