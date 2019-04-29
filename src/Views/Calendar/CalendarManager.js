import React, { Component } from "react";
import Calendar from 'react-calendar';
import EventManager from "./Components/EventManager/EventManager";
import DayPreview from "./Components/DayPreview/DayPreview"
import axios from "axios";
import "./CalendarManager.css";

class CalendarManager extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            events: [],
            activeTile: new Date(),
            activeMonth: new Date().getMonth()
        }
    }

    tilePicked = (day) => {
        this.setState({ activeTile: day })
    }

    refreshEvents() {
        axios.get(`http://localhost:8080/api/overview/${this.state.activeTile.getFullYear()}/${this.state.activeMonth}?range=1`)
            .then(response => {
                console.log(response);
                this.setState({
                    events: response.data
                })
            })
    }

    componentDidMount() {
        this.refreshEvents();
    }

    viewChanged = ({ activeStartDate, view }) => {
        console.log(view)
        if (!view || view === "month") {
            console.log("Changed,", activeStartDate)
            this.setState({ activeMonth: activeStartDate.getMonth() })
        }
        this.refreshEvents();
    }

    render() {
        const dayContents = ({ date, view }) => {
            if (view === "month") {
                return (<DayPreview events={this.state.events
                    .filter(e => e.dueDate.day === date.getDate() && Number(e.dueDate.month === this.state.activeMonth))} />)
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
                <EventManager />
            </div>
        )
    }
}

export default CalendarManager;