function orbit([rowsCount, colsCount, startRow, startCol]) {
    let matrix = [];

    for (let row = 0; row < rowsCount; row++) {
        matrix[row] = [];

        for (let col = 0; col < colsCount; col++) {
            let rowsDifference = Math.abs(row - startRow);
            let colsDifference = Math.abs(col - startCol);
            matrix[row][col] = Math.max(rowsDifference, colsDifference) + 1;
        }
    }

    console.log(matrix.map((row) => row.join(' ')).join('\n'));
}
