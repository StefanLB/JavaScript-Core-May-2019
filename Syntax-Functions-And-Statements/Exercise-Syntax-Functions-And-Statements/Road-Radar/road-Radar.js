function roadRadar([speed, area]) {
    const limitsList = {
        'motorway': 130,
        'interstate': 90,
        'city': 50,
        'residential': 20
    };

    const difference = speed - limitsList[area];

    if (difference > 0 && difference <= 20) {
        console.log('speeding');

    } else if (difference > 20 && difference <= 40) {
        console.log('excessive speeding');

    } else if (difference > 40) {
        console.log('reckless driving');
    }
}
