import React from "react";
import { useDrag } from "react-dnd";
import { CanvasCard } from "model/interfaces";
import { VscGripper } from "react-icons/vsc";
import "./card.css";

declare interface CardProps {
  item: CanvasCard;
  onRemove?;
  hideSourceOnDrag?: boolean;
  children?: any;
}

const Card = (props: CardProps) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: props.item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      id={props.item.id}
      ref={preview}
      className="card"
      style={{
        display: isDragging && props.hideSourceOnDrag ? "none" : "flex",
        opacity: isDragging ? 0.5 : 1,
        top: props.item.y,
        left: props.item.x,
      }}
    >
      <div className="flex justify-end p-3">
        <div
          ref={drag}
          id={`${props.item.id}-drag-handle`}
          className="card-drag-handle"
        ></div>
      </div>

      {props.children}
    </div>
  );
};

export default Card;
