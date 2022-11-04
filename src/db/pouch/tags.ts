import PouchDB from "pouchdb";
import Find from "pouchdb-find";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "@/model/interfaces";

PouchDB.plugin(Find);

let db = new PouchDB("tags");
await db.createIndex({
  index: {
    fields: ["name"],
  },
});

export const insertTag = async (name: string): Promise<string> => {
  if (!name) throw new Error("Tag name cannot be empty");

  const existingTags = await db.find({
    selector: { name: name, fields: ["name"] },
  });

  if (existingTags.docs.length > 0) {
    return existingTags.docs[0]._id;
  } else if (existingTags.docs.length === 0) {
    const response = await db.put({
      _id: uuidv4(),
      name,
    });
    return response.id;
  }
};

export const getTags = async (tagIds: string[]): Promise<Tag[]> => {
  const response = await db.bulkGet({ docs: tagIds.map((id) => ({ id })) });
  return response.results.reduce((acc, result) => {
    if ((result.docs[0] as any)?.ok) {
      acc.push({ id: result.id, name: (result.docs[0] as any).ok.name });
    }
    return acc;
  }, []);
};

export const getAllTags = async (): Promise<Tag[]> => {
  const response = await db.allDocs({ include_docs: true });
  return response.rows.map((row) => row as unknown as Tag);
};
