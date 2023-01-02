import cloudinary from "../config/cloudinary";

export async function uploadMentorAvatar(
  avatarBase64Str: string,
  discordId: string
) {
  try {
    const resp = await cloudinary.v2.uploader.upload(avatarBase64Str, {
      folder: "/mentorings-app/avatars",
      public_id: `avatar-${discordId}`,
    });
    return {
      image_url: resp.secure_url,
    };
  } catch (err) {
    return { image_url: null };
  }
}
