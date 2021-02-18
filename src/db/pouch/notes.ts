import PouchDB from "pouchdb";
import Upsert from "pouchdb-upsert";
import { Note, PMState } from "model/interfaces";
import { v4 as uuidv4 } from "uuid";

PouchDB.plugin(Upsert);
let db = new PouchDB("notes");

export async function updateNote(inputDocument: Note) {
  try {
    const docId = inputDocument.id || inputDocument["_id"];
    const response = await db.upsert(docId, (doc) => {
      return inputDocument as Partial<PouchDB.Core.IdMeta>;
    });
    return response;
  } catch (error) {
    console.log(`ERROR: couldn't update ${error}`);
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

export async function getNotes() {
  try {
    let result = await db.allDocs({ include_docs: true });
    return result?.rows;
  } catch (error) {
    console.log(`ERROR fetching all notes ${error}`);
  }
}

export async function getNoteById(id: string) {
  try {
    const doc = await db.get(id);
    return doc;
  } catch (error) {
    console.log(`ERROR fetching  ${id} ${error}`);
  }
}

export function onChange(callback) {
  db.changes({
    since: "now",
    live: true,
  }).on("change", () => callback());
}
