import React, { Component } from "react";

class EventManager extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <div className="event-viewer"><p>Shoo</p></div>
        )
    }
}

export default EventManager;