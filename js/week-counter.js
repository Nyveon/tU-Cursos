"use strict";

/**
 * Function that returns an array of Dates representing each day of the week
 * that contains date
 */
function getWeek(date) {
    var day = date.getDay();

    //We need to do this because Date uses sunday as the first day of the week
    var monday_date = date.getDate() + (day === 0 ? -6 : -day + 1);

    var week_date = new Date(date.setDate(monday_date));
    var week = [new Date(week_date)];
    while (week_date.setDate(week_date.getDate() + 1) && week_date.getDay() !== 1) {
        week.push(new Date(week_date));
    }
    return week;
}

/**
 * Compares two dates ignoring time of the day
 */
function areSameDate(d1, d2) {
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return +d1 === +d2;
}

function areInSameWeek(d1, d2) {
    var semana_d1 = getWeek(d1);
    for (var day of semana_d1) {
        if (areSameDate(day, d2)) {
            return true;
        }
    }
    return false;
}

/**
 * Returns the first day of the week of d1
 */
function startOfWeek(d1) {
    let dia = 24 * 60 * 60 * 1000;
    const diaSemana = d1.getDay();
    return new Date(d1.getTime() - diaSemana * dia);
}

/**
 * Returns the number of weeks between d1 and d2
 */
function weeksBetween(d1, d2) {
    let semana = 7 * 24 * 60 * 60 * 1000;
    return Math.round((startOfWeek(d2) - startOfWeek(d1)) / semana);
}

/**
 * Function that reduces an array of dates so as to only include one day per
 * week
 */
function reduceWeek(dates) {
    var current = dates[0];
    var filtered = [];

    var i = 1;
    while (i < dates.length) {
        console.log(current);
        while (areInSameWeek(current, dates[i])) {
            current = dates[i];
            i += 1;
            if (i >= dates.length) {
                break;
            }
        }
        filtered.push(current);
        current = dates[i];
        i += 1;
    }
    return filtered;
}

// Weeks with classes
function isNormalWeek(date, class_weeks) {
    for (var day of class_weeks) {
        if (areInSameWeek(day, date)) {
            return true;
        }
    }
    return false;
}

// Number of recess weeks until current
function recessWeeksUntil(current, class_weeks) {
    var recess_weeks = 0;
    var weeks_in_between = 0;

    var i = 0;
    while (i < class_weeks.length - 1) {
        if ( class_weeks[i] > current || areInSameWeek(class_weeks[i], current)) {
            return recess_weeks;
        }

        weeks_in_between = weeksBetween(class_weeks[i], class_weeks[i + 1]);
        recess_weeks += weeks_in_between - 1;
        i += weeks_in_between;
    }
    return recess_weeks;
}

/**
 * Main function. It parses and processes the data and it then inserts the
 * final value into the DOM
 */
function addCounter(file) {
    var schedule_date_dom = document.getElementById("body").getElementsByTagName("h1")[0];

    // We use DD/MM/YYYY format
    // TODO: Handle english language case
    var date_parts = schedule_date_dom.innerText.split(" ")[2].split("/");

    var current_date = new Date(date_parts[2], date_parts[1] - 1, date_parts[0]);

    // Parse data from iCal
    var calendar_events = ICAL.parse(file)[2];

    /**
     * We build an array containing only the dates from calendar_events.
     * The rest of the metadata is ignored.
     */
    var dates = [];
    calendar_events.forEach(e => dates.push(new Date(e[1][4][3])));
    dates.sort(function(d1, d2){
        return d1 - d2;
    });

    // Last item is undefined for some reason?
    //dates.splice(-1)

    var filtered_dates = reduceWeek(dates);

    // +1 because we want to take into account the current week
    var total_weeks = weeksBetween(filtered_dates[0], current_date) + 1;
    var past_recess_weeks = recessWeeksUntil(current_date, filtered_dates);
    var is_class_week = isNormalWeek(current_date, filtered_dates);

    var text = is_class_week? total_weeks - past_recess_weeks : "No hay clases";

    const add = " (" + text + ")";

    // We insert the number into the page
    schedule_date_dom.append(add);
}

chrome.storage.local.get("settings").then(data => {
    const settings = data.settings ?? {};

    if (!settings["qol-week-counter"]) {
        return;
    }

    var href = document.getElementsByClassName("file ical")[0].href;
    fetch(href).then(r => r.text()).then(d => addCounter(d));
});
