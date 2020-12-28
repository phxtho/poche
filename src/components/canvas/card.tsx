import React from "react";
import { useDrag } from 'react-dnd'
import { CanvasCard} from './constants'

declare interface CardProps {
  item: CanvasCard,
  onRemove,
  hideSourceOnDrag: boolean
}

const Card = (props: CardProps) => { 
    const [{ isDragging }, drag] = useDrag({
        item: props.item,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()  
        })
      })
if(isDragging && props.hideSourceOnDrag){
  return <div ref={drag}></div>
}else{
 return <div 
            id={props.item.id}
            ref={drag}
            className="card" 
            style={{
                opacity: isDragging ? 0.5 : 1,
                top: props.item.y,
                left: props.item.x
            }}
  ></div>}
}

export default Card