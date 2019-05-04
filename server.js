const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { SimpleDate, EventItem, SimpleEvent, daysMatch } = require("./src/shared/shared.js")

const app = express();

app.use(cors());
app.use(bodyParser.json());

let eventList = [];
let nextID = 0;

eventList.push(new EventItem("Test", "Just a test", new SimpleDate(2019, 4, 26), nextID++),
    new EventItem("Test 2", "More tests", new SimpleDate(2019, 5, 26), nextID++),
    new EventItem("Test 3", "Still Testing", new SimpleDate(2019, 5, 26), nextID++))

const apiBase = "/api";

app.get(`${apiBase}/overview/:year/:month`, (req, res, next) => {
    res.send(
        eventList.filter(e => e.matchMonthRange(req.params.year, req.params.month, req.query.range))
            .map(e => ({ name: e.name, dueDate: e.dueDate }))
    )
})

app.get(`${apiBase}/detailed/:year/:month/:day`, (req, res, next) => {
    res.send(
        eventList.filter(e => {
            const compareDate = new SimpleDate(req.params.year, req.params.month, req.params.day);
            return e.dueDate.matchesDay(compareDate);
        })
    )
})

app.get(`${apiBase}/upcoming/`, (req, res, next) => {
    const currentTime = Date.now();

    res.send(eventList.filter(e => e.dueDate.asDate() >= currentTime)
        .map(e => ({ name: e.name, dueDate: e.dueDate })));
})

app.delete(`${apiBase}/remove/`, (req, res, next) => {
    eventList = eventList.filter(e => e.ID != req.query.id);
    res.send(req.query.id);
    console.log("RemoveTest", eventList)
})

app.patch(`${apiBase}/update/`, (req, res, next) => {
    console.log(req.body)
    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].ID === Number(req.body.ID)) {
            eventList[i].name = req.body.name;
            eventList[i].description = req.body.description;
            const dueDate = new SimpleDate();
            eventList[i].dueDate = dueDate.fromObject(req.body.date);

            res.send(String(req.body.ID));

            return;
        }
    }

    res.send(String(-1));
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});