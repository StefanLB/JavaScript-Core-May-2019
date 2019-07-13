function populationInTowns(input) {

    Object.entries(input.reduce((acc, tokens) => {
        const [town, population] = tokens.split(' <-> ');

        if (!acc[town]) {
            acc[town] = 0;
        }

        acc[town] += Number(population);
        return acc;
    }, {}))
        .forEach(([town, population]) => {
            console.log(`${town} : ${population}`);
        });
}
