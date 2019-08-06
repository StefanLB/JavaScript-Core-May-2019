function subSum(array, startIndex, endIndex) {
    if (!Array.isArray(array)) {
        return NaN;
    }

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex > array.length - 1) {
        endIndex = array.length - 1;
    }

    return array.slice(startIndex, endIndex + 1)
        .map(Number).reduce((a, b) => a + b, 0);
}
