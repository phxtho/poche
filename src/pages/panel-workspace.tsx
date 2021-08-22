import React from "react";
import SearchBar from "components/searchbar/searchbar";
import { useDispatch, useSelector } from "react-redux";
import { ICanvas, ICanvasCard, INote, ItemTypes } from "model/interfaces";
import NoteList from "components/note-list/note-list";
import { ADD_ITEM_TO_CANVAS } from "store";
import EditorContainer from "components/editor/container";

export default function PanelWorkspace() {
  const cards: ICanvasCard[] = useSelector(
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

  return (
    <div className="min-h-screen">
      <div id="top-bar" className="flex flex-row-reverse p-8">
        <SearchBar />
      </div>
      <div className="flex h-full w-full space-x-1">
        <NoteList handleNoteButtonClick={addNoteToCanvas} />
        {cards.map((card, idx) => (
          <EditorContainer key={idx} id={card.id} />
        ))}
      </div>
    </div>
  );
}
