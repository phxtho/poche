import React from "react";
import NoteList from "components/note-list/note-list";
import { Link } from "@reach/router";
import { Note } from "model/interfaces";

export default function Dev() {
  return (
    <div className="bg-gray round">
      <Link to="/">
        <div className="flex bg-black h-12 text-white">
          <h1 className="mx-auto">Dev</h1>
        </div>
      </Link>

      <NoteList
        handleNoteButtonClick={(note: Note) => {
          console.log(note.id);
        }}
      />
    </div>
  );
}
