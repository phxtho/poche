import PouchDB from "pouchdb";
import Upsert from "pouchdb-upsert";
import { IPeer } from "@/model/interfaces";

PouchDB.plugin(Upsert);

let db = new PouchDB("peers");

export function onChange(callback) {
  db.changes({
    since: "now",
    live: true,
  }).on("change", () => callback());
}

export async function upsertPeer(inputPeer: IPeer) {
  try {
    const docId = inputPeer.id || inputPeer["_id"];
    const response = await db.upsert(docId, (doc) => {
      return inputPeer as Partial<PouchDB.Core.IdMeta>;
    });
    return response;
  } catch (error) {
    console.log(`ERROR: couldn't upsert \n${error}`);
  }
}

export async function deletePeer(peerId: string) {
  try {
    const docId = peerId;
    const rev = await db.get(docId).then((res) => res._rev);
    const response = await db.remove(docId, rev);
    return response;
  } catch (error) {
    console.log(`ERROR: couldn't delete \n${error}`);
  }
}

export async function getPeers(): Promise<
  PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta>[]
> {
  try {
    let result = await db.allDocs({ include_docs: true });
    return result?.rows?.map((row) => row.doc);
  } catch (error) {
    console.log(`ERROR fetching all peers \n${error}`);
  }
}
