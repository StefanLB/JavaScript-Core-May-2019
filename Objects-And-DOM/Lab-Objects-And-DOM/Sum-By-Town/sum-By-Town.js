function sumByTown(params) {
    let towns = {};

    for (let i = 0; i < params.length; i += 2) {
        let town = params[i];
        let income = Number(params[i + 1]);

        if (!towns[town]) {
            towns[town] = 0;
        }

        towns[town] += income;
    }

    let outputJson = JSON.stringify(towns);
    console.log(outputJson);
}
