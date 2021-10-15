import PouchDB from "pouchdb";
import Upsert from "pouchdb-upsert";
import { INote, PMState, SearchResult } from "model/interfaces";
import QuickSearch from "pouchdb-quick-search";
import { v4 as uuidv4 } from "uuid";
import Debug from "pouchdb-debug";

PouchDB.plugin(Upsert);
PouchDB.plugin(QuickSearch);

//Enables debugging
// PouchDB.plugin(Debug);
// PouchDB.debug.enable("*");

let db = new PouchDB("notes");

(db as any)
  .search({ fields: ["title", "text"], build: true })
  .then(() => console.log("Index created succesfully"))
  .catch((err) => console.log("ERROR failed to build index"));

export const defaultState = { type: "doc", content: [{ type: "paragraph" }] };

export async function updateNote(inputDocument: INote) {
  try {
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
      state: state || defaultState,
      createdTime: createdTime || Date.now(),
      lastEditedTime: lastEditedTime || Date.now(),
    };

    const storedDocument = await db.putIfNotExists(newDocument);
    return storedDocument;
  } catch (error) {
    console.log(`ERROR: couldn't create doc ${error}`);
  }
}

export async function deleteNote(inputDocument: INote) {
  try {
    const docId = inputDocument.id || inputDocument["_id"];
    const rev = await db.get(docId).then((res) => res._rev);
    const response = await db.remove(docId, rev);
    return response;
  } catch (error) {
    console.log(`ERROR: couldn't delete \n${error}`);
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
    .then((res) => res)
    .catch((err) => console.log(`Search failed ${err}`));
}
