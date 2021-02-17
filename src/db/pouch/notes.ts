import PouchDB from "pouchdb";
import Upsert from "pouchdb-upsert";
import { Note } from "../contants";
import { v4 as uuidv4 } from "uuid";

PouchDB.plugin(Upsert);
let db = new PouchDB("notes");

export async function updateNote(inputDocument: Note) {
  try {
    const response = await db.upsert(inputDocument.id, () => inputDocument);
    return response;
  } catch (error) {
    console.log(`FAILED: couldn't update ${error}`);
  }
}

// Create a new note
export async function insertNote(
  title?: string,
  meta?: object,
  body?: object,
  createdTime?: string,
  lastEditedTime?: string
) {
  try {
    let newDocument = {
      _id: uuidv4(),
      title: title || null,
      meta: meta || {},
      body: body || {},
      createdTime: createdTime || Date.now(),
      lastEditedTime: lastEditedTime || Date.now(),
    };

    const storedDocument = await db.putIfNotExists(newDocument);
    return storedDocument;
  } catch (error) {
    console.log(`FAILED: couldn't create doc ${error}`);
  }
}

export async function getNotes() {
  try {
    let result = await db.allDocs({ include_docs: true });
    return result?.rows;
  } catch (error) {
    console.log(`Couldn't fetch data ${error}`);
  }
}

export function onChange(callback) {
  db.changes({
    since: "now",
    live: true,
  }).on("change", () => callback());
}
