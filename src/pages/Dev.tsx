import React from "react";
import NoteList from "components/note-list/note-list";
import { Link } from "@reach/router";

export default function Dev(props) {
  return (
    <div className="bg-gray round">
      <Link to="/">
        <div className="bg-black h-12"></div>
      </Link>

      <NoteList />
    </div>
  );
}
