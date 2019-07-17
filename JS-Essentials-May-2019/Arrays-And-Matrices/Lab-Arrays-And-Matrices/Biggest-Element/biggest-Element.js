function biggestElement(matrix) {
    const maxNumber = matrix.reduce((accumulator, array) => {
        const currentMax = Math.max(...array);

        if (currentMax > accumulator) {
            accumulator = currentMax;
        }

        return accumulator;
    }, Number.MIN_SAFE_INTEGER);

    console.log(maxNumber);
}
