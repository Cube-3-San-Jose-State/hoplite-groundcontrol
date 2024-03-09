import "../Components/File.css"
import React from 'react'
import { useDrag } from 'react-dnd'

/**
 * Your Component
 */
export default function File({name}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "file",
        item: { id: name},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
  return (
    <div className='file-card' style={{border: isDragging ? "5px solid pink" : "0px"}} ref={drag}><span>{name}</span></div>
  )
}