function argumentInfo() {
    const argumentsList = Array.from(arguments)
        .reduce((accObj, element) => {
            const type = typeof element;
            console.log(type + ': ' + element);

            if (!accObj[type]) {
                accObj[type] = 0;
            }

            ++accObj[type];
            return accObj;
        }, {});

    Object.entries(argumentsList)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
            console.log(type + ' = ' + count);
        });;
}
