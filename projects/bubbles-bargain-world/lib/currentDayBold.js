//sets up event to make current day bold on header
var dayBold = function () {
    //sets up variables
    var date, days, day;

    //gets current date
    date = new Date();

    //sets up the days to be used later
    days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    //gets the day number from date from earlier then gets what day it is from list above
    day = days[date.getDay()];

    //finds element with the day from above and makes it bold
    document.getElementById(day).style.fontWeight = "bold";
}();