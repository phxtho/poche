import Peer from "peerjs";
import { getNotes, updateNote } from "db/pouch/notes";

class Replicator {
  id: string;
  peer: Peer;

  constructor() {
    this.id = localStorage.getItem("peerId");
    this.peer = new Peer(this.id);

    this.peer.on("open", function (id) {
      localStorage.setItem("peerId", id);
      console.log("My peer ID is: " + id);
    });

    this.peer.on("connection", (dataConnection) => {
      dataConnection.on("data", (data) => {
        console.log(`Recieved data from ${dataConnection.peer}`);
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
    this.peer.connect(peerId);
  }

  async Replicate() {
    try {
      let dataToSend = await getNotes();
    } catch (e) {
      console.log(e);
    }
  }
}

export default Replicator;
