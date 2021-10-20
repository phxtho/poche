import React, { useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "db/pouch/notes";
import { ADD_ITEM_TO_CANVAS } from "store";
import { useDispatch, useSelector } from "react-redux";
import { ICanvas, ICanvasCard, INote, ItemTypes } from "model/interfaces";
import { useNavigate } from "@reach/router";
import AddNoteFAB from "components/add-note-fab/add-note-fab";
import { VscKebabVertical } from "react-icons/vsc";
import NoteOptionsModal from "components/note-options-modal/note-options-modal";
import "./library.css";

export default function Library() {
  const [allNotes, setAllNotes] = useState<INote[]>([]);
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<INote>();

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

  const openNoteOptions = (note: INote) => {
    setSelectedNote(note);
    setNoteOptionsOpen(true);
  };

  useEffect(() => {
    fetchAllNotes();
    onChange(fetchAllNotes);

    return () => {
      setAllNotes([]);
    };
  }, [fetchAllNotes]);

  return (
    <>
      <div className="min-h-screen max-w-full">
        <div className="p-5">
          <table className="rounded-lg divide-y divide-gray-200 note-list shadow-md">
            <thead>
              <tr>
                <th className="w-11/12 lg:w-9/12">Note</th>
                <th className="hidden lg:block w-2/12">Edited</th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {allNotes
                .sort((a, b) => (a.lastEditedTime < b.lastEditedTime ? 1 : -1)) // Sort by last edited date descending
                .map((note, idx) => {
                  const noteText = note?.state?.doc ? note.text : "";

                  return (
                    <tr key={idx} id={`row-${note.id}`}>
                      <td>
                        <button
                          className="truncate w-full transition duration-250 ease-in-out bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
                          onClick={() => {
                            addNoteToCanvas(note);
                            navigate("/experiment-501.V2/p");
                          }}
                        >
                          <div className="flex flex-col text-left">
                            <div className="font-medium flex space-x-1">
                              <span>{note.title || "No Title"}</span>
                              <span
                                className={`rounded-full h-2 w-2 bg-green-500 ${
                                  openCanvasCards.find((el) => el.id == note.id)
                                    ? "inline"
                                    : "hidden"
                                } `}
                              ></span>
                            </div>
                            <span className="text-sm text-gray-500 font-light">
                              {note.text || "empty"}
                            </span>
                          </div>
                        </button>
                      </td>
                      <td className="hidden md:block">
                        {new Date(note.lastEditedTime).toLocaleString()}
                      </td>
                      <td>
                        <button onClick={() => openNoteOptions(note)}>
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

      <NoteOptionsModal
        isOpen={noteOptionsOpen}
        note={selectedNote}
        onRequestClose={() => {
          setSelectedNote(null);
          setNoteOptionsOpen(false);
        }}
      />
    </>
  );
}