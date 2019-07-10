function cookingByNumbers(paramsList) {
    const commandsList = {
        chop: function (number) {
            return number / 2;
        },
        dice: function (number) {
            return Math.sqrt(number);
        },
        spice: function (number) {
            return ++number;
        },
        bake: function (number) {
            return number * 3;
        },
        fillet: function (number) {
            return number * 0.8;
        }
    };

    paramsList.reduce((number, command) => {
        number = commandsList[command](number);
        console.log(number);
        return number;
    }, Number(paramsList.shift()));
}
