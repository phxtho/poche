import Peer from "peerjs";
import { getNotes, updateNote } from "db/pouch/notes";

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
    console.log(`Connected to ${this.dataConnection.peer}`);
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
