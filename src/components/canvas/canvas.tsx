import React, { useCallback, useState } from "react";
import { DndProvider, useDrop, XYCoord } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "@/components/card/card";
import { ItemTypes, ICanvasCard, INote, ICanvas } from "@/model/interfaces";
import { v4 as uuidv4 } from "uuid";
import EditorContainer from "@/components/editor-container/editor-container";
import { useSelector, useDispatch } from "react-redux";
import { ADD_ITEM_TO_CANVAS, UPDATE_ITEM } from "store";
import "./canvas.css";
import NoteList from "@/components/note-list/note-list";

function CanvasContainer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Canvas />
    </DndProvider>
  );
}

export default CanvasContainer;

const Canvas = (props) => {
  const debug = false;
  const [mousePos, setMousePos] = useState<XYCoord>({ x: 0, y: 0 });
  const [noteListPos, setNoteListPos] = useState<XYCoord>({ x: 0, y: 0 });

  const cards: ICanvasCard[] = useSelector(
    (state: { cards: ICanvasCard[] }) => state.cards
  );
  // const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.COLLECTION],
    drop: (item: ICanvasCard, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const x = Math.round(item.x + delta.x);
      const y = Math.round(item.y + delta.y);
      item.type === ItemTypes.CARD
        ? moveCardPosition(item.id, x, y)
        : setNoteListPos({ x, y });

      return { x, y };
    },
  });

  const createCard = useCallback((x: number, y: number) => {
    const newCard: ICanvasCard = {
      type: ItemTypes.CARD,
      id: uuidv4(),
      x: x,
      y: y,
    };
    // dispatch({ type: ADD_ITEM_TO_CANVAS, payload: newCard });
  }, []);

  const moveCardPosition = useCallback((id: string, x: number, y: number) => {
    // dispatch({ type: UPDATE_ITEM, payload: { id: id, x: x, y: y } });
  }, []);

  const addNoteToCanvas = (note: INote) => {
    const item: ICanvasCard = {
      id: note?.id,
      type: ItemTypes.CARD,
      x: 690,
      y: 320,
    };
    // dispatch({ type: ADD_ITEM_TO_CANVAS, payload: item });
  };

  return (
    <div
      className="canvas"
      ref={drop}
      onMouseMove={(e) => {
        setMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      }}
      onDoubleClick={(e) => {
        createCard(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }}
    >
      {debug && (
        <span style={{ color: "white" }}>
          x: {mousePos.x},y: {mousePos.y}
        </span>
      )}

      <Card
        item={{
          type: ItemTypes.COLLECTION,
          id: uuidv4(),
          x: noteListPos.x,
          y: noteListPos.y,
        }}
      >
        <NoteList handleNoteButtonClick={addNoteToCanvas} />
      </Card>

      {Object.entries(cards).map(([key, card], index) => (
        <Card key={index} item={card} hideSourceOnDrag>
          <EditorContainer id={card.id} />
        </Card>
      ))}
    </div>
  );
};
