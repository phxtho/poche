import React, { useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "db/pouch/notes";
import { schema } from "components/editor/schema";
import { INote } from "model/interfaces";

interface NoteListProps {
  handleNoteButtonClick(note: INote): any;
}

const NoteList = (props: NoteListProps) => {
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
    <div className="flex w-64 flex-col rounded shadow-md items-center divide-y divide-gray-200 divide-opacity-50">
      {allNotes.map((note, idx) => {
        const noteText = note?.state?.doc ? note.text : "";

        return (
          <button
            className="truncate w-full transition duration-250 ease-in-out bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
            key={idx}
            onClick={() => {
              props.handleNoteButtonClick(note);
            }}
          >
            {note.title || noteText}
          </button>
        );
      })}
    </div>
  );
};

export default NoteList;
