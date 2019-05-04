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

    matchesDateDay(day) {
        return day.getFullYear() === this.year
            && day.getMonth() === this.month
            && day.getDate() === this.day
    }

    matchesDay(day) {
        return day.year === this.year
            && day.month === this.month
            && day.day === this.day
    }

    simpleString() {
        return `${this.year}-${("00" + (this.month + 1)).slice(-2)}-${("00" + this.day).slice(-2)}`
    }

    fromObject(obj) {
        this.year = obj.year;
        this.month = obj.month;
        this.day = obj.day;
        this.hour = obj.hour;
        this.minute = obj.minute;
        return this;
    }
}

module.exports.EventItem = class EventItem {
    constructor(name, description, dueDate, ID) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.ID = ID;
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

module.exports.daysMatch = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
}