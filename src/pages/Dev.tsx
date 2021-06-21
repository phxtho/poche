import React from "react";
import NoteList from "components/note-list/note-list";
import { Link } from "@reach/router";
import { Note } from "model/interfaces";

export default function Dev() {
  return (
    <div className="min-h-screen">
      <div id="top-bar" className="flex flex-row-reverse p-8">
        <div className="h-14 w-80 border border-black rounded-full flex justify-between pl-6 items-center">
          <input
            className="w-3/4 h-full bg-transparent overflow-ellipsis"
            type="text"
          />
          <button className="h-14 w-14 rounded-full bg-black">0</button>
        </div>
      </div>
    </div>
  );
}
