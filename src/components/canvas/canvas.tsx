import React, { useState } from "react";
import {DndProvider, useDrop} from 'react-dnd'
import {HTML5Backend} from "react-dnd-html5-backend";
import Card from "./card";
import { ItemTypes, CanvasCard } from "./constants";
import {v4 as uuidv4} from 'uuid'
import './canvas.css'

const CanvasContainer = () => {
    
 return <DndProvider backend={HTML5Backend}>
     <Canvas/>
 </DndProvider>
}

export default CanvasContainer

const Canvas = () => {
    const [cards, setCards] = useState<CanvasCard[]>([])
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item,monitor) => {
            const position = monitor.getSourceClientOffset()
            console.log(`dropped: ${JSON.stringify (position)}`)
            return position
        }       
      })

    return <div className="canvas" ref={drop} onDoubleClick={(e)=> {
        const newCard: CanvasCard = {id: uuidv4(), x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
        setCards([...cards, newCard])
    }}>
        {cards.map((card, index )=> <Card key={index} id={card.id} x={card.x} y={card.y} />)}
    </div>
}