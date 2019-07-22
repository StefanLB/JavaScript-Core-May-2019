function minkeDecode(paramsArr) {
    let startIndex = Number(paramsArr.shift());
    let endIndex = Number(paramsArr.shift());
    let partWord = paramsArr.shift().toLowerCase();

    let countryPattern = /[A-Z][A-Za-z]+[A-Z]/g;
    let townPattern = /\d{3}(\.\d+)?/g;

    let countryCode = paramsArr[0].match(countryPattern)[0];
    let townCode = paramsArr[0].match(townPattern)
        .map((x) => Math.ceil(x)).map((x) => String.fromCharCode(x)).join('');

    let country = countryCode.slice(0, startIndex) + partWord + countryCode.slice(endIndex + 1);
    country = country.slice(0, 1).toUpperCase() + country.slice(1).toLowerCase();
    let town = townCode.slice(0, 1).toUpperCase() + townCode.slice(1).toLowerCase();
    console.log(`${country} => ${town}`);
}
