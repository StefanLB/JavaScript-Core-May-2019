function vatCalculator(includedVAT, rateVAT) {
    console.log((includedVAT / ((rateVAT / 100) + 1)).toFixed(2));
}
