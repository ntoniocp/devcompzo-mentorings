export function getAvatarPlaceHolder(userFullName: string) {
  return `https://ui-avatars.com/api/?name=${userFullName.replaceAll(
    " ",
    "+"
  )}`;
}
