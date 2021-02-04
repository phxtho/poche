import React, { useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "../../db/pouch";
import "./note-list.css";

const NoteList = () => {
  const [allNotes, setAllNotes] = useState([]);

  const fetchAllNotes = useCallback(async () => {
    const response = await getNotes();
    setAllNotes(response);
  }, [setAllNotes]);

  useEffect(() => {
    fetchAllNotes();
    onChange(fetchAllNotes);
  }, [fetchAllNotes]);

  return (
    <div className="note-list">
      {allNotes.map((note, idx) => (
        <div key={idx}>{note.id}</div>
      ))}
    </div>
  );
};

export default NoteList;
