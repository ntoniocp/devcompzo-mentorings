export interface Mentor {
  id: string;
  fullName: string;
  discordId?: string;
  discordHandle: string;
  description: string;
  tags: string[];
  pictureUrl?: string;
  email?: string;
  active: boolean;
}

export type EditableMentorData = Omit<Mentor, "id" | "email" | "discordId">;
export type CreatableMentorData = Omit<Mentor, "id">;
