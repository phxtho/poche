import React, { useState } from "react";
import { useDrag } from 'react-dnd'
import {ItemTypes} from './constants'

const Card = () => {
    const[offset, setOffset] = useState({x:0, y:0})
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD },
        end: (item,monitor) => { 
            if(monitor.didDrop()){
                const {x,y} = monitor.getDropResult()
                setOffset({x:x,y:y})
            }
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()  
        })
      })
 return <div 
            ref={drag}
            className="card" 
            style={{
                opacity: isDragging ? 0.5 : 1,
                top: offset.y - 100,
                left: offset.x + 50
            }}
  ></div>
}

export default Card