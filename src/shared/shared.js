module.exports.SimpleDate = class SimpleDate {
    constructor(year, month, day, hour = 12, minute = 0) {
        this.year = Number(year);
        this.month = Number(month);
        this.day = Number(day);
        this.hour = Number(hour);
        this.minute = Number(minute);
    }

    asDate() {
        return new Date(this.year, this.month, this.day, this.hour, this.minute);
    }
}

class EventItem {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }

    matchMonth(year, month) {
        return this.dueDate.year === year && this.dueDate.month === month;
    }

    matchMonthRange(year, month, searchRadius) {
        year = parseInt(year);
        month = parseInt(month);
        searchRadius = parseInt(searchRadius);
        console.log(this.matchMonth(year, month), year, month, this.dueDate.year, this.dueDate.month);
        if (this.matchMonth(year, month))
            return true;

        if (searchRadius === undefined)
            searchRadius = 0;

        for (let i = 1; i <= searchRadius; i++) {
            let lowMonth = month - i;
            let highMonth = month + i;

            let lowYear = year;
            while (lowMonth < 0) {
                lowMonth += 12;
                lowYear--;
            }

            let highYear = year + Math.floor(highMonth / 12);

            if (this.matchMonth(lowYear, lowMonth) || this.matchMonth(highYear, highMonth))
                return true;
        }

        return false;
    }
}

module.exports.SimpleEvent = class SimpleEvent {
    constructor(name, description, date) {
        this.name = name;
        this.description = description;
        this.date = date;
    }
}