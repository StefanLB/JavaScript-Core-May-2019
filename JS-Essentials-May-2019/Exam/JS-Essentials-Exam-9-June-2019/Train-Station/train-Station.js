function trainStation(capacity, passengers) {
    let [train, currentPassengers] = [[], 0];

    for (let index = 0; index < passengers.length; index++) {
        train[index] = 0;
        currentPassengers += passengers[index];

        if (currentPassengers <= capacity) {
            train[index] = currentPassengers;
            currentPassengers = 0;

        } else if (currentPassengers > capacity) {
            train[index] = capacity;
            currentPassengers -= capacity;
        }
    }

    console.log(train);
    console.log(currentPassengers === 0
        ? 'All passengers aboard'
        : `Could not fit ${currentPassengers} passengers`);
}
