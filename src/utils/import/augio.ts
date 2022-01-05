import { insertNote } from "db/pouch/notes";

export default function ImportFromAugio(augioJson: any[]) {
  augioJson.forEach((x) => {
    insertNote(x.id, x.title, null, x.document, x.creationTime, x.updateTime);
  });
}
