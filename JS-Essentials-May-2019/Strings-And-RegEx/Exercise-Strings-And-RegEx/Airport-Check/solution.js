function solve() {
    let text = document.getElementById('string').value;
    let div = document.getElementById('result');
    let [str, type] = text.split(', ');

    let namePattern = /\s[A-Z]([A-Za-z]*)(-[A-Z][A-Za-z]*\.)?-([A-Z][A-Za-z]*)\s/g;
    let airportPattern = /\s[A-Z]{3}\/[A-Z]{3}\s/g;
    let flightPattern = /\s[A-Z]{1,3}\d{1,5}\s/g;
    let comapanyPattern = /\- [A-Z][A-Za-z]*\*[A-Z][A-Za-z]*\s/g;

    let name = str.match(namePattern)[0].trim().replace(/-/g, ' ');
    let [from, to] = str.match(airportPattern)[0].trim().split('/');
    let flight = str.match(flightPattern)[0].trim();
    let company = str.match(comapanyPattern)[0].replace('-', '').split('*').join(' ').trim();

    if (type === 'name') {
        div.textContent = `Mr/Ms, ${name}, have a nice flight!`;
    } else if (type === 'flight') {
        div.textContent = `Your flight number ${flight} is from ${from} to ${to}.`;
    } else if (type === 'company') {
        div.textContent = `Have a nice flight with ${company}.`;
    } else if (type === 'all') {
        div.textContent = `Mr/Ms, ${name}, your flight number ${flight} is from ${from} to ${to}. Have a nice flight with ${company}.`;
    }
}
