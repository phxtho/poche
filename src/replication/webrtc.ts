import Peer from "peerjs";
import { getNotes, updateNote } from "db/pouch/notes";

const addPeer = (peerId: string) => {
  let peers = JSON.parse(localStorage.getItem("peers"));
  if (Array.isArray(peers)) {
    if (!peers.find((x) => x == peerId)) {
      (peers as Array<string>).push(peerId);
      localStorage.setItem("peers", JSON.stringify(peers));
    }
  } else {
    peers = [peerId];
    localStorage.setItem("peers", JSON.stringify(peers));
  }
};

class Replicator {
  id: string;
  peer: Peer;
  dataConnection: Peer.DataConnection;

  constructor() {
    this.id = localStorage.getItem("peerId");
    this.peer = new Peer(this.id);

    this.peer.on("open", function (id) {
      localStorage.setItem("peerId", id);
      console.log("My peer ID is: " + id);
    });

    this.peer.on("connection", (dataConnection) => {
      console.log(`Connected to ${dataConnection.peer}`);
      this.peer.listAllPeers((peers) => peers.forEach((x) => addPeer(x)));

      this.dataConnection = dataConnection;

      dataConnection.on("data", (data) => {
        console.log(`Recieved data from ${this.dataConnection.peer}`);
        console.log(data);
        if (Array.isArray(data)) {
          data.forEach((item) => updateNote(item));
        }
      });
    });

    this.peer.on("error", (error) => {
      console.error(error);
    });
  }

  Connect(peerId: string) {
    this.dataConnection = this.peer.connect(peerId, { serialization: "json" });
    this.peer.listAllPeers((peers) => peers.forEach((x) => addPeer(x)));
  }

  async Replicate() {
    try {
      let dataToSend = await getNotes();
      this.dataConnection.send(dataToSend);
    } catch (e) {
      console.log(e);
    }
  }
}

export default Replicator;
