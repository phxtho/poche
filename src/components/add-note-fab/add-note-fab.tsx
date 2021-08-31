import React, { useCallback } from "react";
import { ItemTypes, ICanvasCard, INote, ICanvas } from "model/interfaces";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM_TO_CANVAS } from "store";

export default function AddNoteFAB() {
  const dispatch = useDispatch();

  const createCard = useCallback(() => {
    const newCard: ICanvasCard = {
      type: ItemTypes.CARD,
      id: uuidv4(),
      x: 0,
      y: 0,
    };
    dispatch({ type: ADD_ITEM_TO_CANVAS, payload: newCard });
  }, [dispatch]);

  return (
    <button
      onClick={() => createCard()}
      className="rounded-full h-16 w-16 fixed right-8 bottom-8 bg-black text-white flex justify-center items-center shadow-md hover:pointer"
    >
      <VscAdd />
    </button>
  );
}
