import React from "react";
import {DndProvider, useDrop} from 'react-dnd'
import {HTML5Backend} from "react-dnd-html5-backend";
import Card from "./card";
import { ItemTypes } from "./constants";
import './canvas.css'

const CanvasContainer = () => {
    
 return <DndProvider backend={HTML5Backend}>
     <Canvas/>
 </DndProvider>
}

export default CanvasContainer

const Canvas = () => {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item,monitor) => {
            const position = monitor.getSourceClientOffset()
            console.log(`dropped: ${JSON.stringify (position)}`)
            return position
        }       
      })

    return <div className="canvas" ref={drop}>
        <Card/>
    </div>
}