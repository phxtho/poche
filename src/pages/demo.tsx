import React, { useEffect, useState } from "react";
import SearchBar from "components/searchbar/searchbar";
import { Connect, Replicate } from "replication/webrtc";

export default function Demo() {
  const [peerId, setPeerId] = useState<string>("");
  const [dataToSend, setDataToSend] = useState<string>();

  return (
    <div className="min-h-screen">
      <div id="top-bar" className="flex flex-row-reverse p-8">
        <SearchBar />
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <input
            className="border border-black"
            type="text"
            onChange={(e) => {
              setPeerId(e.target.value);
            }}
          />
          <button
            className="rounded bg-blue-500 text-white"
            onClick={(e) => {
              Connect(peerId);
            }}
          >
            Connect
          </button>
        </div>
        <div className="flex flex-col">
          <textarea
            className="border border-black"
            onChange={(e) => {
              setDataToSend(e.target.value);
            }}
          ></textarea>
          <button
            className="bg-green-500 text-white rounded"
            onClick={(e) => {
              Replicate();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
