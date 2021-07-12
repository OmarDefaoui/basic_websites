const dataSpans = document.querySelectorAll(".number");

function countdown() {
    // Format: Sat Jan 01 2022 00:00:00 GMT+0100 (GMT+01:00)
    const currentDate = new Date();

    // Get next year date
    var nextYear = '1 Jan ' + (currentDate.getFullYear() + 1);
    var nextYearDate = new Date(nextYear);

    // The diff between the dates
    var d = Math.abs(nextYearDate - currentDate) / 1000;
    // Result var
    var r = {};
    // Math constants
    var s = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    var i = 0;

    // Calculate diff in years, months, days, hours, minutes and seconds
    Object.keys(s).forEach(function (key) {
        r[key] = Math.floor(d / s[key]);
        d -= r[key] * s[key];

        // Display data into screen
        dataSpans[i].innerHTML = format(r[key]);
        i++;
    });

    // To Log the results
    console.log(r);
}

function format(a) {
    if (a < 10)
        return '0' + a;
    else
        return a;
}

// Call func every second
countdown();
setInterval(countdown, 1000);