import React, { useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "db/pouch/notes";
import { ADD_ITEM_TO_CANVAS } from "store";
import { useDispatch, useSelector } from "react-redux";
import { ICanvas, ICanvasCard, INote, ItemTypes } from "model/interfaces";
import { useNavigate } from "@reach/router";
import AddNoteFAB from "components/add-note-fab/add-note-fab";
import { VscKebabVertical } from "react-icons/vsc";
import "./library.css";

export default function Library() {
  const [allNotes, setAllNotes] = useState<INote[]>([]);

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
    const response = (await getNotes()) as any;
    setAllNotes(response);
  }, [setAllNotes]);

  useEffect(() => {
    fetchAllNotes();
    onChange(fetchAllNotes);
  }, [fetchAllNotes]);

  return (
    <div className="min-h-screen">
      <div className="p-5">
        <table className="h-full w-full rounded-lg divide-y divide-gray-200 note-list">
          <thead>
            <tr>
              <th>Note</th>
              <th>Edited</th>
            </tr>
          </thead>
          <tbody>
            {allNotes
              .sort((a, b) => (a.lastEditedTime < b.lastEditedTime ? 1 : -1)) // Sort by last edited date descending
              .map((note, idx) => {
                const noteText = note?.state?.doc ? note.text : "";

                return (
                  <tr>
                    <td>
                      <button
                        className="truncate w-full transition duration-250 ease-in-out bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
                        key={idx}
                        onClick={() => {
                          addNoteToCanvas(note);
                          navigate("/experiment-501.V2/p");
                        }}
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-medium">
                            {note.title || "No Title"}
                          </span>
                          <span className="text-sm text-gray-500 font-light">
                            {note.text || "empty"}
                          </span>
                        </div>
                      </button>
                    </td>
                    <td className="text-center">
                      {new Date(note.lastEditedTime).toLocaleString()}
                    </td>
                    <td>
                      <button>
                        <VscKebabVertical />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <AddNoteFAB handleClick={() => navigate("/experiment-501.V2/p")} />
      </div>
    </div>
  );
}
