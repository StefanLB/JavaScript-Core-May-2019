function processOddNumbers(params) {
    console.log(params.filter((_, i) => i % 2 === 1).map((x) => x * 2).reverse().join(' '));
}
