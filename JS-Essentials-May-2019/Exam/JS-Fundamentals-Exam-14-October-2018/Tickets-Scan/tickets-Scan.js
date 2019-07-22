function ticketsScan(inputStr, info) {
    let namePattern = /(?<=\s)([A-Z][A-Za-z]*(?:-[A-Z][A-Za-z]*\.)?-[A-Z][A-Za-z]*)(?=\s)/g;
    let airportPattern = /(?<=\s)([A-Z]{3}\/[A-Z]{3})(?=\s)/g;
    let flightPattern = /(?<=\s)([A-Z]{1,3}[0-9]{1,5})(?=\s)/g;
    let companyPattern = /(?<=-\s)([A-Z][A-Za-z]*\*[A-Z][A-Za-z]*)(?=\s)/g;

    let name = inputStr.match(namePattern)[0].split('-').join(' ');
    let [from, to] = inputStr.match(airportPattern)[0].split('/');
    let flight = inputStr.match(flightPattern)[0];
    let company = inputStr.match(companyPattern)[0].split('*').join(' ');

    if (info === 'name') {
        console.log(`Mr/Ms, ${name}, have a nice flight!`);

    } else if (info === 'flight') {
        console.log(`Your flight number ${flight} is from ${from} to ${to}.`);

    } else if (info === 'company') {
        console.log(`Have a nice flight with ${company}.`);

    } else if (info === 'all') {
        console.log(`Mr/Ms, ${name}, your flight number ${flight} is from ${from} to ${to}. Have a nice flight with ${company}.`);
    }
}
