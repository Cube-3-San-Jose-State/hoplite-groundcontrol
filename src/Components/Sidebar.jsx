import React from "react";
import "../Components/Sidebar.css";
import Folder from "./Folder";
import File from "./File";


function Sidebar() {
    return(
        <div className="sidebar">
            <Folder><File name={"JAMESON"}/><File name={"WANKER"}/></Folder>
        </div>
    );
}
export default Sidebar;