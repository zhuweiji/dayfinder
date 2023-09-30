// generate events
var eventDates = {}
// let day1 = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)))
// eventDates[day1] = [
//     'Event 1, Location',
//     'Event 2, Location 2'
// ]
// let day2 = formatDate(new Date(new Date().setDate(new Date().getDate() + 40)))
// eventDates[day2] = [
//     'Event 2, Location 3',
// ]

// Create a new Date object
let currentDate = new Date();


// set maxDates
var maxDate = {
    1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
    2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
    3: new Date(new Date().setMonth(new Date().getMonth() + 9))
}

var flatpickr = $('#calendar .placeholder').flatpickr({
    inline: true,
    minDate: 'today',
    maxDate: maxDate[3],
    showMonths: 1,
    defaultDate: currentDate,
    enable: getNextDates(14),
    disableMobile: "true",
    onChange: function (date, str, inst) {
        var contents = '';
        $('#calendar .calendar-events').html(contents)
    },
    locale: {
        weekdays: {
            shorthand: ["S", "M", "T", "W", "T", "F", "S"],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ]
        }
    }
})

eventCaledarResize($(window));
$(window).on('resize', function () {
    eventCaledarResize($(this))
})

function eventCaledarResize($el) {
    var width = $el.width()
    if (flatpickr.selectedDates.length) {
        flatpickr.clear()
    }
    if (width >= 992 && flatpickr.config.showMonths !== 3) {
        flatpickr.set('showMonths', 3)
        flatpickr.set('maxDate', maxDate[3])
    }
    if (width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
        flatpickr.set('showMonths', 2)
        flatpickr.set('maxDate', maxDate[2])
    }
    if (width < 768 && flatpickr.config.showMonths !== 1) {
        flatpickr.set('showMonths', 1)
        flatpickr.set('maxDate', maxDate[1])
        $('.flatpickr-calendar').css('width', '')
    }
}

function formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1; //Month from 0 to 11
    let y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

// Define a function that takes a number of days as an argument
function getNextDates(days) {
    let dates = [];
    let currentDate = new Date();
    for (let i = 0; i < days; i++) {
        currentDate.setDate(currentDate.getDate() + 1);
        let nextDate = new Date(currentDate);
        dates.push(nextDate);
    }

    return dates;
}