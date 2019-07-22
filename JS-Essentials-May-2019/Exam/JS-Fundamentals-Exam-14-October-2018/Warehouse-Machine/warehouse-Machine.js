function warehouseMachine(inputData) {
    const brands = {};

    for (const tokens of inputData) {
        const [command, brand, subBrand, date, quantity] = tokens.split(', ');

        if (command === 'IN') {
            if (!brands[brand]) {
                brands[brand] = {};
            }

            if (!brands[brand][subBrand]) {
                brands[brand][subBrand] = { date, quantity: Number(quantity) };
            }

            if (brands[brand][subBrand].date === date) {
                brands[brand][subBrand] = { date, quantity: Number(quantity) };
            }

            if (brands[brand][subBrand].date < date) {
                brands[brand][subBrand] = { date, quantity: Number(quantity) };
            }
        } else if (command === 'OUT') {
            if (brands[brand] &&
                brands[brand][subBrand] &&
                brands[brand][subBrand].date > date &&
                brands[brand][subBrand].quantity >= Number(quantity)) {
                brands[brand][subBrand].quantity -= Number(quantity);
            }
        } else if (command === 'REPORT') {
            console.log('>>>>> REPORT! <<<<<');

            Object.entries(brands).forEach(([brand, subBrand]) => {
                console.log(`Brand: ${brand}:`);

                Object.entries(subBrand).forEach(([name, info]) => {
                    console.log(`-> ${name} -> ${info.date} -> ${info.quantity}.`);
                });
            });
        } else if (command === 'INSPECTION') {
            console.log('>>>>> INSPECTION! <<<<<');

            Object.entries(brands)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .forEach(([brand, subBrand]) => {
                    console.log(`Brand: ${brand}:`);

                    Object.entries(subBrand)
                        .sort((a, b) => b[1].quantity - a[1].quantity)
                        .forEach(([name, info]) => {
                            console.log(`-> ${name} -> ${info.date} -> ${info.quantity}.`);
                        });
                });
        }
    }
}
