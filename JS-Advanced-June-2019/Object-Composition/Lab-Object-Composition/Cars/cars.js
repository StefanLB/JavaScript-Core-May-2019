function cars(inputList) {
    const carsList = {};

    const commandsList = {
        create: function ([name, inherits, parentName]) {

            if (!carsList[name]) {
                carsList[name] = {};
            }

            if (inherits && parentName) {
                carsList[name] = Object.create(carsList[parentName]);
            }
        },
        set: function ([name, key, value]) {
            carsList[name][key] = value;
        },
        print: function ([name]) {
            const propertiesList = [];

            for (const key in carsList[name]) {
                propertiesList.push(`${key}:${carsList[name][key]}`);
            }

            console.log(propertiesList.join(', '));
        }
    };

    inputList.forEach((element) => {
        const paramsList = element.split(' ');
        const command = paramsList.shift();
        commandsList[command](paramsList);
    });
}
