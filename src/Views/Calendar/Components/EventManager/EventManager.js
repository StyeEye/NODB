import React, { Component } from "react";
import axios from "axios";
import { SimpleDate, daysMatch } from "../../../../shared/shared"
import Event from "./Event/Event"
import "./EventManager.css"

class EventManager extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            fullEvents: []
        }
    }

    updateList() {
        axios.get(`/api/detailed/${this.props.day.getFullYear()}/${this.props.day.getMonth()}/${this.props.day.getDate()}`)
            .then(response => {
                response.data = response.data.map(e => {
                    e.dueDate = new SimpleDate(e.dueDate.year, e.dueDate.month, e.dueDate.day, e.dueDate.hour, e.dueDate.minute);
                    return e;
                })
                this.setState({
                    fullEvents: response.data
                })
                console.log("Reply:", response)
            })
            .catch(reason => console.log(reason))
    }

    componentDidMount() {
        this.updateList();
    }

    componentDidUpdate(prevProps) {
        console.log("Events changed!", prevProps.version, this.props.version)
        if (!daysMatch(this.props.day, prevProps.day) || prevProps.version !== this.props.version) {
            console.log("hi")
            this.updateList();
        }
    }

    render() {
        const test = this.state.fullEvents.map(e =>
            (<Event event={e} removeFunc={this.props.removeFunc} updateFunc={this.props.updateFunc}/>)
        )
        return (
            <div className="event-viewer">
                <div>
                    <p>{`Events on ${this.props.day.getMonth() + 1}/${this.props.day.getDate()}/${this.props.day.getFullYear()}`}</p>
                </div>
                {test}
            </div>
        )
    }
}

export default EventManager;