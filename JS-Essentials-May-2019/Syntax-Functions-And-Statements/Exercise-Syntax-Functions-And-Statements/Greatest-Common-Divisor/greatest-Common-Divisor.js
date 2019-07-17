function greatestCommonDivisor(a, b) {
    return b === 0 ? console.log(a) : greatestCommonDivisor(b, a % b);
}
