import React, { Component } from "react";
import "./Event.css"

class Event extends Component {
    constructor(props) {
        super(props)
        console.log(props.event)
        this.state = {
            event: props.event,
            dateString: props.event.dueDate.simpleString(),
            name: props.event.name,
            description: props.event.description,
            editing: true,
            newEvent: props.newEvent
        }
    }

    componentDidUpdate(prevProps) {
        console.log("Testing Testing 1 2 3", this.props)
        if (prevProps.event.ID != this.props.event.ID) {
            this.setState({
                event: this.props.event,
                dateString: this.props.event.dueDate.simpleString()
            })
        }
    }

    inputChanged = (input, event) => {
        console.log(this.state.dateString)
        this.setState({
            [input]: event
        })
    }

    eventChanged = (input, val) => {
        const event = Object.assign({}, this.state.event, {
            [input]: val
        })
        this.setState({
            event: event
        })
    }

    testFunc() {
        console.log("Changed")
    }

    render() {
        const event = this.state.event;
        return (
            <div className="event">
                <div className="event-title">
                    <h2>{this.props.event.name}</h2>
                    <input type="button" value="X" onClick={e => {
                        console.log("clicked")
                        this.props.removeFunc(this.state.event.ID)
                    }} />
                    <input type="button" value="U" onClick={() => {
                        this.props.updateFunc(this.state.event.ID, this.state.event.name, this.state.event.description, this.state.event.dueDate)
                    }} />
                </div>
                <input
                    type="date" value={this.state.dateString} name="test"
                    onChange={e => this.inputChanged("dateString", e.target.value)}
                    disabled={true}
                />
                <input
                    type="text"
                    value={this.state.event.name}
                    disabled={!this.state.editing}
                    onChange={e => this.eventChanged("name", e.target.value)}
                />
                <input
                    type="text"
                    value={this.state.event.description}
                    disabled={!this.state.editing}
                    onChange={e => this.eventChanged("description", e.target.value)}
                />
            </div>
        )
    }
}

export default Event;