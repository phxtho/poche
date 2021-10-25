import Peer from "peerjs";
import { getNotes, updateNote } from "db/pouch/notes";
import { upsertPeer } from "db/pouch/peers";
import { IPeer } from "model/interfaces";

let id: string;
let peer: Peer;
let dataConnection: Peer.DataConnection;

id = localStorage.getItem("peerId");

try {
  peer = new Peer(id);
} catch {
  peer = new Peer();
  id = peer.id;
}

peer.on("open", function (id) {
  localStorage.setItem("peerId", id);
  console.log("My peer ID is: " + id);
});

peer.on("connection", (dataConnection) => {
  console.log(`Connected to ${dataConnection.peer}`);
  Object.keys(peer.connections).forEach((x) => {
    addPeer(x);
  });

  dataConnection = dataConnection;

  dataConnection.on("data", (data) => {
    console.log(`Recieved data from ${dataConnection.peer}`);
    console.log(data);
    if (Array.isArray(data)) {
      data.forEach((item) => updateNote(item));
    }
  });
});

peer.on("error", (error) => {
  console.error(error);
});

const addPeer = (peerId: string) => {
  let peer: IPeer = { id: peerId };
  upsertPeer(peer);
};

export function Connect(peerId: string) {
  dataConnection = peer.connect(peerId, { serialization: "json" });
  Object.keys(peer.connections).forEach((x) => {
    addPeer(x);
  });
}

export async function Replicate() {
  try {
    let dataToSend = await getNotes();
    dataConnection.send(dataToSend);
  } catch (e) {
    console.log(e);
  }
}
