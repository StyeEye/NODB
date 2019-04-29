import React from "react";
//import { SimpleDate, SimpleEvent } from "../../../../shared/shared"

function DayPreview(props) {
    const items = props.events.map(e => <p>{e.name}</p>)

    return (<div>{items}</div>)
}

export default DayPreview;