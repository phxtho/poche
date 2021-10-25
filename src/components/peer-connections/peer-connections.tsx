import React, { useState, useEffect } from "react";
import { VscVm } from "react-icons/vsc";
import { getPeers, onChange } from "db/pouch/peers";
import { Connect } from "replication/webrtc";

interface Props {}

const PeerConnections = () => {
  const [peers, setPeers] = useState<any[]>([]);

  useEffect(() => {
    getPeers().then((val) => setPeers(val));
    onChange((_) => getPeers().then((val) => setPeers(val)));

    return () => {
      setPeers([]);
    };
  }, []);

  return (
    <div className="flex space-x-2">
      {peers?.map((peer, idx) => (
        <div
          key={idx}
          className="rounded-sm shadow-lg bg-black text-white h-10 w-10 flex flex-col justify-center items-center overflow-hidden "
        >
          <VscVm />
        </div>
      ))}
    </div>
  );
};

export default PeerConnections;
