import React from "react";
import Sidebar from "./Components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "./Components/Canvas";
import "./App.css"

function App () {
  return(
    <>
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <Sidebar/>
        <Canvas/>
      </DndProvider>
    </div>
    </>
  );
}
export default App
