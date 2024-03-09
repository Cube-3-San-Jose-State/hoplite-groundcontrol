import React from "react";
import "../Components/Folder.css";

const Folder = ({ name, children}) => {
    const [
        isExpanded,
        setIsExpanded
    ] = React.useState(false)


    const ref = React.useRef();

    const [height, setHeight] = React.useState();

    const handleToggle = e => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
        setHeight(ref.current.clientHeight);
    };

    const classes = `folder-child ${
        isExpanded ? "is-expanded": null
    }`;

    const currentHeight = isExpanded ? height : 0;
    return(
        <div className={classes}>
            <div className="folder-container">
                <span onClick={handleToggle} className="folder-title">Folder name</span>
                <div className="card-collapse" style={{height: currentHeight + "px" }}>
                    <div className="folder-item" ref={ref}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Folder;