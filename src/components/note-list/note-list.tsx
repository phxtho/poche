import React, { useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "db/pouch/notes";
import { useDispatch } from "react-redux";
import { ADD_ITEM_TO_CANVAS } from "store";
import { CanvasCard, ItemTypes } from "model/interfaces";
import "./note-list.css";

const NoteList = () => {
  const [allNotes, setAllNotes] = useState([]);
  const dispatch = useDispatch();

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
        <div
          className="note-list-item"
          key={idx}
          onClick={() => {
            const item: CanvasCard = {
              id: note?.id,
              type: ItemTypes.CARD,
              x: 690,
              y: 320,
            };
            dispatch({ type: ADD_ITEM_TO_CANVAS, payload: item });
          }}
        >
          {note.id}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
