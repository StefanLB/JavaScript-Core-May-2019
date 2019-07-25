function caffeineStudy(daysCount) {
    let volumes = {
        coffeeVolume: 0,
        cocaColaVolume: 0,
        teaVolume: 0,
        energyDrinkVolume: 0
    };

    for (let day = 1; day <= daysCount; day++) {

        volumes.coffeeVolume += 3 * 150;
        volumes.cocaColaVolume += 2 * 250;
        volumes.teaVolume += 3 * 350;

        if (day % 5 === 0) {
            volumes.energyDrinkVolume += 3 * 500;
        }

        if (day % 9 === 0) {
            volumes.cocaColaVolume += 4 * 250;
            volumes.energyDrinkVolume += 2 * 500;
        }
    }

    let coffeines = {
        coffee: 40 / 100,
        cocaCola: 8 / 100,
        tea: 20 / 100,
        energyDrink: 30 / 100
    };

    let coffeeCoffeine = volumes.coffeeVolume * coffeines.coffee;
    let cocaColaCoffeine = volumes.cocaColaVolume * coffeines.cocaCola;
    let teaCoffeine = volumes.teaVolume * coffeines.tea;
    let energyDrinkCoffeine = volumes.energyDrinkVolume * coffeines.energyDrink;

    let consumedCaffeine = coffeeCoffeine + cocaColaCoffeine + teaCoffeine + energyDrinkCoffeine;
    console.log(`${consumedCaffeine} milligrams of caffeine were consumed`);
}
