function fitnessRates(day, service, hour) {
    const getDay = function (day) {
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    };

    const servicesInfo = {
        'Fitness': (day, hour) => day <= 4 ? (hour <= 15 ? 5.00 : 7.50) : 8.00,
        'Sauna': (day, hour) => day <= 4 ? (hour <= 15 ? 4.00 : 6.50) : 7.00,
        'Instructor': (day, hour) => day <= 4 ? (hour <= 15 ? 10.00 : 12.50) : 15.00
    };

    console.log(servicesInfo[service](getDay(day), hour));
}
