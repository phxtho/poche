import React, { useCallback } from "react";
import { ItemTypes, ICanvasCard } from "model/interfaces";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { ADD_ITEM_TO_CANVAS } from "store";
import { insertNote } from "db/pouch/notes";

export default function AddNoteFAB(props) {
  const dispatch = useDispatch();

  const createCard = useCallback(async () => {
    let newNote = await insertNote();
    const newCard: ICanvasCard = {
      type: ItemTypes.CARD,
      id: newNote.id,
      x: 0,
      y: 0,
    };
    dispatch({ type: ADD_ITEM_TO_CANVAS, payload: newCard });
  }, [dispatch]);

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
