function keplersProblem(mean, ecc) {
    const approximate = function (E0, ecc, series) {
        if (Math.abs(mean - (E0 - ecc * Math.sin(E0))) < 1e-9 || series > 200) return E0;
        return approximate(E0 - (E0 - ecc * Math.sin(E0) - mean) / (1 - ecc * Math.cos(E0)), ecc, ++series);
    };

    console.log(Number(approximate(mean, ecc, 0).toFixed(9)));
}
