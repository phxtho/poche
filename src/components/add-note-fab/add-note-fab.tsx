import React, { useCallback, useContext } from "react";
import { VscAdd } from "react-icons/vsc";
import { insertNote } from "db/pouch/notes";
import NotesContext from "components/NotesContext";

export default function AddNoteFAB(props) {
  const { items, addItem } = useContext(NotesContext);

  const createCard = useCallback(async () => {
    let newNote = await insertNote();
    addItem(items, newNote.id);
  }, [addItem, items]);

  return (
    <button
      onClick={() => {
        createCard();
        props?.handleClick?.();
      }}
      className="rounded-full h-16 w-16 fixed right-8 bottom-8 bg-black text-white flex justify-center items-center shadow-md hover:pointer border-2 border-white"
    >
      <VscAdd />
    </button>
  );
}
