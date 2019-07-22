function travelTime(paramsArr) {
    let countriesObj = {};

    paramsArr.forEach((tokens) => {
        let [country, town, cost] = tokens.split(' > ');

        if (town[0] === town[0].toLowerCase()) {
            town = town.substr(0, 1).toUpperCase() + town.slice(1);
        }

        if (!countriesObj[country]) {
            countriesObj[country] = {};
        }

        if (!countriesObj[country][town]) {
            countriesObj[country][town] = +cost;
        }

        if (countriesObj[country][town] > +cost) {
            countriesObj[country][town] = +cost;
        }
    });

    let sortedCountries = Object.entries(countriesObj)
        .sort((a, b) => a[0].localeCompare(b[0]));

    for (let [country, townsObj] of sortedCountries) {

        let sortedTowns = Object.entries(townsObj)
            .sort((a, b) => a[1] - b[1]).map((x) => x.join(' -> '));

        console.log(`${country} -> ${sortedTowns.join(' ')}`);
    }
}
