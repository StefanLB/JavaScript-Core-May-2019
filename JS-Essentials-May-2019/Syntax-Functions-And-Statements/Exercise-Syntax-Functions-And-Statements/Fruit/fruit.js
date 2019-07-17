function fruit(typeOfFruit, weightInGrams, pricePerKilogram) {
    const weightInKilograms = weightInGrams / 1000;
    const totalSum = weightInKilograms * pricePerKilogram;
    console.log(`I need $${totalSum.toFixed(2)} to buy ${weightInKilograms.toFixed(2)} kilograms ${typeOfFruit}.`);
}
