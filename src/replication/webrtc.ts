import Peer from "peerjs";
import { getNotes, updateNote } from "@/db/pouch/notes";
import { upsertPeer } from "@/db/pouch/peers";
import { IPeer } from "@/model/interfaces";

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
  dataConnection.on("open", () => {
    // Emitted when the connection is established and ready-to-use.
    dataConnection.on("data", (data) => {
      console.log(`Recieved data from ${dataConnection.peer}`);
      console.log(data);
      if (Array.isArray(data)) {
        data.forEach((item) => updateNote(item));
      }
    });
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
  try {
    dataConnection = peer.connect(peerId, { serialization: "json" });
    Object.keys(peer.connections).forEach((x) => {
      addPeer(x);
    });
  } catch (error) {
    console.log(error);
  }
}

export async function Replicate() {
  try {
    dataConnection.on("open", async () => {
      // Emitted when the connection is established and ready-to-use.
      let dataToSend = await getNotes();
      dataConnection.send(dataToSend);
      console.log("data sent");
    });
  } catch (e) {
    console.log(e);
  }
}
