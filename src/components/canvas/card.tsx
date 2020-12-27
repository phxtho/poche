import React, { useState } from "react";
import { useDrag } from 'react-dnd'
import {ItemTypes} from './constants'

const Card = props => {
    const[offset, setOffset] = useState({x:props.x, y:props.y})
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
                top: offset.y,
                left: offset.x
            }}
  ></div>
}

export default Card