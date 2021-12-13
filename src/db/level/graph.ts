import level from "level";
import levelgraph from "levelgraph";

let db = levelgraph(level("graph"));

export function insertTriple(triple: ITriple): Promise<ITriple> {
  return new Promise((resolve, reject) => {
    db.put(triple, (err) => {
      if (err) reject(err);
      else resolve(triple);
    });
  });
}

export function getTriplesFromNode(node: string): Promise<ITriple[]> {
  return new Promise((resolve, reject) => {
    db.get({ subject: node }, (err, triples: ITriple[]) => {
      if (err) return reject(err);
      else resolve(triples);
    });
  });
}

export function getTriplesToNode(node: string): Promise<ITriple[]> {
  return new Promise((resolve, reject) => {
    db.get({ object: node }, (err, triples: ITriple[]) => {
      if (err) return reject(err);
      else resolve(triples);
    });
  });
}

export function deleteTriple(triple: ITriple): Promise<ITriple> {
  return new Promise((resolve, reject) => {
    db.del(triple, (err) => {
      if (err) reject(err);
      else resolve(triple);
    });
  });
}

interface ITriple {
  subject: string;
  predicate: "references";
  object: string;
}
