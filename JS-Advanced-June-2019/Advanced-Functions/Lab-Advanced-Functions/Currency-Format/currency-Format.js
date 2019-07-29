function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);

    return symbolFirst === true
        ? symbol + ' ' + result
        : result + ' ' + symbol;
}

function formatCurrency(currencyFormatter) {
    return function (value) {
        return currencyFormatter(',', '$', true, value);
    }
}
