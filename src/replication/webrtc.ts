import Peer from "peerjs";
import { getNotes, updateNote } from "db/pouch/notes";

let peer = new Peer();
let dataConnection: Peer.DataConnection;

peer.on("open", function (id) {
  localStorage.setItem("peerId", id);
  console.log("My peer ID is: " + id);
});

peer.on("connection", (dataConnection) => {
  dataConnection.on("data", (data) => {
    console.log(`Recieved data from ${dataConnection.peer}`);
    if (Array.isArray(data)) {
      data.forEach((item) => updateNote(item));
    }
  });
});

export function Connect(peerId: string) {
  dataConnection = peer.connect(peerId);
}

export async function Replicate() {
  try {
    let dataToSend = await getNotes();
    dataConnection.send(dataToSend);
  } catch (e) {
    console.log(e);
  }
}

export default peer;
