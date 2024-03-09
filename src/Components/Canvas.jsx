import "../Components/Canvas.css"
import React, { useState } from 'react'
import { useDrop } from 'react-dnd'

/**
 * Your Component
 */
export default function Canvas({}) {
    const [File, setFiles] = useState([]);
    const [Module, setModule] = useState("Janes");

    const [{isOver}, drop] = useDrop(() => ({
        accept: "file",
        drop: (item) => addFileToCanvas(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addFileToCanvas = (id) => {
        setModule(id);
        console.log(id);
    }

  return (
    <div className="canvas-container" ref={drop}>
        <span>{Module}</span>
    </div>
  )
}