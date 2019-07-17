function magicMatrices(matrix) {

    const rowsSums = matrix.reduce((acc, array) => {

        const currSum = array.reduce((a, b) => a + b, 0);
        acc.push(currSum);
        
        return acc;
    }, []);

    const colsSum = matrix.reduce((acc, array) => {

        array.forEach((number, index) => {
            acc[index] = (acc[index] || 0) + number;
        });

        return acc;
    }, []);

    const checker = rowsSums[0];
    const isMagic = rowsSums.concat(colsSum)
        .every((value) => checker === value);

    console.log(isMagic);
}
