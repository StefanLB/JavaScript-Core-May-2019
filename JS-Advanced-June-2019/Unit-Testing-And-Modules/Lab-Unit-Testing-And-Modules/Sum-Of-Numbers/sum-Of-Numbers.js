function sum(array) {
    return array.map(Number).reduce((a, b) => a + b, 0);
}

module.exports = { sum };
