import React, { useState } from "react";
import {DndProvider, useDrop, XYCoord} from 'react-dnd'
import {HTML5Backend} from "react-dnd-html5-backend";
import Card from "./card";
import { ItemTypes, CanvasCard } from "./constants";
import {v4 as uuidv4} from 'uuid'
import update from 'immutability-helper'
import './canvas.css'

const CanvasContainer = () => {
    
 return <DndProvider backend={HTML5Backend}>
     <Canvas/>
 </DndProvider>
}

export default CanvasContainer

const Canvas = (props) => {
    const[mousePos, setMousePos] = useState<XYCoord>({x:0, y:0})

    const [cards, setCards] = useState<{
        [key: string]: CanvasCard
      }>({})
    
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item: CanvasCard,monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
            const x = Math.round(item.x + delta.x)
            const y = Math.round(item.y + delta.y)
            moveCardPosition(item.id, x, y)
            return {x, y}
        }       
      })
    
    const createCard = (x: number, y:number) => {
        const newCard: CanvasCard = {type:ItemTypes.CARD ,id: uuidv4(), x: x, y: y}
        setCards({...cards, [newCard.id] : newCard})
    }
    
    const removeCard = (id: string) => {
        const {[id]: oldCard, ...restOfCards} = cards 
        setCards(restOfCards)
    }

    const moveCardPosition = (id: string, x: number, y: number) => {
        setCards(
          update(cards, {
            [id]: {
              $merge: { x, y },
            },
          }),
        )
    }

    return <div className="canvas" ref={drop}
    onMouseMove={(e) => {
        setMousePos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
    }} 
    onDoubleClick={(e)=> {
        createCard(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }}>
        {props.debug && <span style={{color: 'white'}}>x: {mousePos.x},y: {mousePos.y}</span>}
        {Object.entries(cards).map(([key,card], index )=> <Card key={index} item={card} hideSourceOnDrag onRemove={removeCard} />)}
    </div>
}