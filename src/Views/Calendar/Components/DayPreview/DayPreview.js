import React from "react";
import "./DayPreview.css"
//import { SimpleDate, SimpleEvent } from "../../../../shared/shared"

function DayPreview(props) {
    if (!props.events.length)
        return null;

    const items = props.events.map(e => <p className="preview-item">{e.name}</p>)

    return (<div className="day-preview">{
        items
    }</div>)
}

export default DayPreview;