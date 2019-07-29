function breakfastRobot() {
    const ingredientsList = { protein: 0, carbohydrate: 0, fat: 0, flavour: 0 };

    const recipesList = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
    };

    const restock = function () {
        const [ingredient, quantity] = arguments[0].split(/ /).slice(1);
        ingredientsList[ingredient] += Number(quantity);
        return 'Success';
    };

    const prepare = function () {
        const [recipe, quantity] = arguments[0].split(/ /).slice(1);

        for (const ingredient in recipesList[recipe]) {
            const neededQuantity = recipesList[recipe][ingredient] * quantity;

            if (ingredientsList[ingredient] < neededQuantity) {
                return `Error: not enough ${ingredient} in stock`;
            }
        }

        for (const ingredient in recipesList[recipe]) {
            const neededQuantity = recipesList[recipe][ingredient] * quantity;
            ingredientsList[ingredient] -= neededQuantity;
        }

        return 'Success';
    };

    const report = function () {
        const { protein, carbohydrate, fat, flavour } = { ...ingredientsList };
        return `protein=${protein} carbohydrate=${carbohydrate} fat=${fat} flavour=${flavour}`;
    };

    return function () {
        if (arguments[0].startsWith('restock')) {
            return restock(arguments[0]);

        } else if (arguments[0].startsWith('prepare')) {
            return prepare(arguments[0]);

        } else if (arguments[0].startsWith('report')) {
            return report(arguments[0]);
        }
    }
}
