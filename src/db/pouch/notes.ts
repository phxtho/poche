import PouchDB from "pouchdb";
import Upsert from "pouchdb-upsert";
import { INote, PMState, SearchResult } from "model/interfaces";
import QuickSearch from "pouchdb-quick-search";
import { v4 as uuidv4 } from "uuid";
import { schema } from "components/editor/schema";

PouchDB.plugin(Upsert);
PouchDB.plugin(QuickSearch);

let db = new PouchDB("notes");

(db as any)
  .search({ fields: ["title", "text"], build: true })
  .then(() => console.log("Index created succesfully"))
  .catch((err) => console.log("ERROR failed to build index"));

export async function updateNote(inputDocument: INote) {
  try {
    let text = schema.nodeFromJSON(inputDocument.state.doc).textContent;
    inputDocument.text = text;
    const docId = inputDocument.id || inputDocument["_id"];
    const response = await db.upsert(docId, (doc) => {
      return inputDocument as Partial<PouchDB.Core.IdMeta>;
    });
    return response;
  } catch (error) {
    console.log(`ERROR: couldn't update \n${error}`);
  }
}

// Create a new note
export async function insertNote(
  id?: string,
  title?: string,
  meta?: object,
  state?: PMState,
  createdTime?: string,
  lastEditedTime?: string
) {
  try {
    let newDocument = {
      _id: id || uuidv4(),
      title: title || null,
      meta: meta || {},
      state: state || {},
      createdTime: createdTime || Date.now(),
      lastEditedTime: lastEditedTime || Date.now(),
    };

    const storedDocument = await db.putIfNotExists(newDocument);
    return storedDocument;
  } catch (error) {
    console.log(`ERROR: couldn't create doc ${error}`);
  }
}

export async function getNotes(): Promise<
  PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>[]
> {
  try {
    let result = await db.allDocs({ include_docs: true });
    return result?.rows?.map((row) => row.doc);
  } catch (error) {
    console.log(`ERROR fetching all notes \n${error}`);
  }
}

export async function getNoteById(id: string) {
  try {
    const doc = await db.get(id);
    return doc;
  } catch (error) {
    console.log(`ERROR fetching  ${id} \n${error}`);
  }
}

export function onChange(callback) {
  db.changes({
    since: "now",
    live: true,
  }).on("change", () => callback());
}

export async function search(
  query: string,
  fields = ["title", "text"]
): Promise<SearchResult> {
  return (db as any)
    ?.search({ query: query, fields: fields, include_docs: true })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(`Search failed ${err}`));
}
