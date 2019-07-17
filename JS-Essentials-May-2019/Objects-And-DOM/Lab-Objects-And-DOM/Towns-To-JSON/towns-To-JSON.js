function townsToJSON(params) {
    const output = params.slice(1).reduce((accumulator, tokens) => {

        const [town, latitude, longitude] = tokens.split('|')
            .filter((x) => x).map((x) => x.trim());

        const townsInfo = {
            'Town': town,
            'Latitude': Number(latitude),
            'Longitude': Number(longitude)
        };

        accumulator.push(townsInfo);
        return accumulator;
    }, []);

    const outputJson = JSON.stringify(output);
    console.log(outputJson);
}
