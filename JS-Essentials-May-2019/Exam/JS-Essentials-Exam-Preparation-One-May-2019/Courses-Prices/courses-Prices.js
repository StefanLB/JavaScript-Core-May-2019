function coursesPrices(fundamentals, advanced, applications, form) {
    const courses = { 'JS Fundamentals': 170, 'JS Advanced': 180, 'JS Applications': 190 };
    let cost = 0;

    if (fundamentals) {
        cost += courses['JS Fundamentals'];
    }

    if (advanced) {
        cost += courses['JS Advanced'];
    }

    if (applications) {
        cost += courses['JS Applications'];
    }

    if (fundamentals && advanced) {
        cost -= courses['JS Advanced'] * 0.1;
    }

    if (fundamentals && advanced && applications) {
        cost -= cost * 0.06;
    }

    if (form === 'online') {
        cost -= cost * 0.06;
    }

    console.log(Math.round(cost));
}
