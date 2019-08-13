function carFactory(carsInfo) {
    let [power, volume] = [0, 0];

    if (carsInfo.power <= 90) {
        [power, volume] = [90, 1800];
    } else if (carsInfo.power <= 120) {
        [power, volume] = [120, 2400];
    } else if (carsInfo.power <= 200) {
        [power, volume] = [200, 3500];
    }

    let diameter = carsInfo.wheelsize;

    if (diameter % 2 === 0) {
        diameter--;
    }

    let wheels = [diameter, diameter, diameter, diameter];

    let clientsCar = {
        model: carsInfo.model,
        engine: {
            power,
            volume
        },
        carriage: {
            type: carsInfo.carriage,
            color: carsInfo.color
        },
        wheels
    };

    return clientsCar;
}
