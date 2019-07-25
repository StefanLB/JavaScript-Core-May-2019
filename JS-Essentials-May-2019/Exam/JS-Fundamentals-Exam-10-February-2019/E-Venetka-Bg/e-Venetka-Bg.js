function eVenetkaBg(input) {
    const towns = {};

    for (const tokens of input) {
        const currentTown = tokens.town;

        if (!towns.hasOwnProperty(currentTown)) {
            towns[currentTown] = { profit: 0, count: 0 };
        }

        const currentPrice = tokens.price;
        towns[currentTown].count += 1;
        towns[currentTown].profit += currentPrice;
    }

    const profitTown = Object.entries(towns).sort((a, b) => {
        return b[1].profit - a[1].profit || b[1].count - a[1].count || a[0].localeCompare(b[0]);
    })[0];

    const townInfo = input.filter((x) => {
        return x.town === profitTown[0];
    });

    const models = {};

    for (const tokens of townInfo) {
        const currentModel = tokens.model;

        if (!models.hasOwnProperty(currentModel)) {
            models[currentModel] = { vignette: 0, count: 0 };
        }

        const currentVignette = tokens.price;
        models[currentModel].count += 1;

        if (models[currentModel].vignette < currentVignette) {
            models[currentModel].vignette = currentVignette;
        }
    }

    const mostDriven = Object.entries(models).sort((a, b) => {
        return b[1].count - a[1].count || b[1].vignette - a[1].vignette || a[0].localeCompare(b[0]);
    })[0];

    const townsFiltered = input.filter((x) => {
        return x.model === mostDriven[0];
    });

    const list = {};

    for (const tokens of townsFiltered) {
        const currentTown = tokens.town;

        if (!list.hasOwnProperty(currentTown)) {
            list[currentTown] = [];
        }

        const currentRegNumber = tokens.regNumber;
        list[currentTown].push(currentRegNumber);
    }

    const townsSorted = Object.entries(list).sort((a, b) => {
        return a[0].localeCompare(b[0]);
    });

    console.log(`${profitTown[0]} is most profitable - ${profitTown[1].profit} BGN`);
    console.log(`Most driven model: ${mostDriven[0]}`);

    townsSorted.forEach(([town, regNumbers]) => {
        console.log(`${town}: ${regNumbers.sort((a, b) => a.localeCompare(b)).join(', ')}`);
    });
}
