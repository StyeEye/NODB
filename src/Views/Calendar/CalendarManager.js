import React, { Component } from "react";
import Calendar from 'react-calendar';
import EventManager from "./Components/EventManager/EventManager";
import DayPreview from "./Components/DayPreview/DayPreview"
import axios from "axios";
import "./CalendarManager.css";
import { SimpleDate, daysMatch } from "../../shared/shared"

class CalendarManager extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            events: [],
            activeTile: new Date(),
            activeMonth: new Date(),
            version: 0
        }
    }

    tilePicked = (day) => {
        this.setState({ activeTile: day })
    }

    refreshEvents() {
        axios.get(`/api/overview/${this.state.activeMonth.getFullYear()}/${this.state.activeMonth.getMonth()}?range=1`)
            .then(response => {
                console.log("Refreshed");
                const events = response.data.map(e => {
                    e.dueDate = Object.assign(new SimpleDate(), e.dueDate);
                    for (const key in e.dueDate)
                        e.dueDate[key] = Number(e.dueDate[key]);
                    //console.dir(e)
                    return e;
                })
                this.setState({
                    events: events,
                    version: this.state.version + 1
                })
            })
    }

    componentDidMount() {
        this.refreshEvents();
    }

    viewChanged = ({ activeStartDate, view }) => {
        console.log(view)
        if (!view || view === "month") {
            //console.log("Changed,", activeStartDate)
            this.setState({ activeMonth: activeStartDate })
        }
        this.refreshEvents();
    }

    removeEvent = (id) => {
        axios.delete(`/api/remove/?id=${id}`)
            .then(response => {
                this.refreshEvents();
            })
    }

    updateEvent = (id, name, description, date) => {
        console.log(id, name, description, date)
        axios.patch(`/api/update/`, {
            ID: id,
            name: name,
            description: description,
            date: date
        })
            .then(response => {
                this.refreshEvents();
            })
            .catch(reason => console.log(reason))
    }

    render() {
        const dayContents = ({ date, view }) => {
            if (view === "month") {
                //console.log(date, this.state.events)

                return (<DayPreview events={
                    this.state.events
                        .filter(e => daysMatch(e.dueDate.asDate(), date))
                } />)
            }
            else
                return null;
        }

        return (
            <div className="calendar-container">
                <Calendar
                    className="main-calendar"
                    value={this.state.activeTile}
                    onClickDay={this.tilePicked}
                    tileContent={dayContents}
                    onActiveDateChange={this.viewChanged}
                    onDrillDown={this.viewChanged}
                    tileClassName="day-tile" />
                <EventManager
                    day={this.state.activeTile}
                    removeFunc={this.removeEvent}
                    updateFunc={this.updateEvent}
                    version={this.state.version}
                />
            </div>
        )
    }
}

export default CalendarManager;