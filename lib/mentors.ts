import {
  Collection,
  Create,
  Documents,
  Get,
  Index,
  Lambda,
  Map,
  Match,
  Paginate,
  Ref,
  Update,
  Var,
} from "faunadb";
import { dbClient } from "../config/db";
import { Mentor } from "../types/mentor";

export async function getAllMentors() {
  const documents: { data: any[] } = await dbClient.query(
    Map(
      Paginate(Documents(Collection("mentors"))),
      Lambda("mentor_ref", Get(Var("mentor_ref")))
    )
  );

  return documents?.data.map((doc: { data: Mentor; ref: { id: string } }) => ({
    ...doc.data,
    id: doc.ref.id,
  }));
}

export async function getMentorByRefId(refNumber: string = "") {
  const { data, ref }: { data: any; ref: { id: string } } =
    await dbClient.query(Get(Ref(Collection("mentors"), refNumber)));
  return { ...data, id: ref.id };
}

export async function getMentorByDiscordId(discordId: string = "") {
  const { data, ref }: { data: Mentor; ref: { id: string } } =
    await dbClient.query(Get(Match(Index("get_by_discord_id"), discordId)));

  return { ...data, id: ref.id };
}

export async function createMentor(data: Mentor) {
  return dbClient.query(Create(Collection("mentors"), { data }));
}

export async function updateMentor(discordId: string, data: Mentor) {
  const originalMentor = await getMentorByDiscordId(discordId);

  return dbClient.query(
    Update(Ref(Collection("mentors"), originalMentor.id), {
      data,
    })
  );
}
