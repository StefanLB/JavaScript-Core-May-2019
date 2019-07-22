function stadium(inputArr) {

    let teamsObj = {
        'LEVSKI': { 'A': [], 'B': [], 'C': [] },
        'VIP': { 'A': [], 'B': [], 'C': [] },
        'LITEX': { 'A': [], 'B': [], 'C': [] }
    }

    let priceObj = {
        'LEVSKI': { 'A': 10, 'B': 7, 'C': 5 },
        'VIP': { 'A': 25, 'B': 15, 'C': 10 },
        'LITEX': { 'A': 10, 'B': 7, 'C': 5 }
    }

    let [seats, income, fans] = [+inputArr.shift(), 0, 0];
    inputArr.forEach((tokens) => {
        let [team, seatNumber, sector] = tokens.split('*');

        if (!teamsObj[team][sector].includes(seatNumber)) {
            fans++;
            income += priceObj[team][sector];
            teamsObj[team][sector].push(seatNumber);
        } else {
            console.log(`Seat ${seatNumber} in zone ${team} sector ${sector} is unavailable`);
        }
    });

    console.log(`${income} lv.\n${fans} fans`);
}
