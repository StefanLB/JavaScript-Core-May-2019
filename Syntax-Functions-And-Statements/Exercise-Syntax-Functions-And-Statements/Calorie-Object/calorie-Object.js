function calorieObject(productsInfo) {
    const productsList = {};

    for (let i = 0; i < productsInfo.length; i += 2) {
        const food = productsInfo[i];
        const calories = Number(productsInfo[i + 1]);
        productsList[food] = calories;
    }

    console.log(productsList);
}
