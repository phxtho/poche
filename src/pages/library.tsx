import React, { useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "db/pouch/notes";
import { ADD_ITEM_TO_CANVAS } from "store";
import { useDispatch, useSelector } from "react-redux";
import { ICanvas, ICanvasCard, INote, ItemTypes } from "model/interfaces";
import { useNavigate } from "@reach/router";
import AddNoteFAB from "components/add-note-fab/add-note-fab";

export default function Library() {
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();

  const openCanvasCards: ICanvasCard[] = useSelector(
    (state: { openCanvas: ICanvas }) => state.openCanvas.items
  );

  const dispatch = useDispatch();
  const addNoteToCanvas = (note: INote) => {
    const item: ICanvasCard = {
      id: note?.id,
      type: ItemTypes.CARD,
      x: 690,
      y: 320,
    };
    dispatch({ type: ADD_ITEM_TO_CANVAS, payload: item });
  };

  const fetchAllNotes = useCallback(async () => {
    const response = await getNotes();
    setAllNotes(response);
  }, [setAllNotes]);

  useEffect(() => {
    fetchAllNotes();
    onChange(fetchAllNotes);
  }, [fetchAllNotes]);

  return (
    <div className="min-h-screen">
      <div className="h-full w-full rounded-lg divide-y divide-gray-200">
        {allNotes.map((note, idx) => {
          const noteText = note?.state?.doc ? note.text : "";

          return (
            <button
              className="truncate w-full transition duration-250 ease-in-out bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
              key={idx}
              onClick={() => {
                addNoteToCanvas(note);
                navigate("/experiment-501.V2/p");
              }}
            >
              {note.title || noteText}
            </button>
          );
        })}
        <AddNoteFAB handleClick={() => navigate("/experiment-501.V2/p")} />
      </div>
    </div>
  );
}
