function spiralMatrix(rowsCount, colsCount) {
    let matrix = [];

    for (let row = 0; row < rowsCount; row++) {
        matrix[row] = [];

        for (let col = 0; col < colsCount; col++) {
            matrix[row][col] = 0;
        }
    }

    let directions = ['right', 'down', 'left', 'up'];
    let [index, currentRow, currentCol] = [0, 0, 0];

    for (let i = 0; i < rowsCount * colsCount; i++) {
        matrix[currentRow][currentCol] = i + 1;

        if (directions[index] === 'right') {

            if (currentCol + 1 >= colsCount ||
                matrix[currentRow][currentCol + 1] !== 0) {
                index = 1;
                currentRow++;
            } else {
                currentCol++;
            }
        } else if (directions[index] === 'down') {

            if (currentRow + 1 >= rowsCount ||
                matrix[currentRow + 1][currentCol] !== 0) {
                index = 2;
                currentCol--;
            } else {
                currentRow++;
            }
        } else if (directions[index] === 'left') {

            if (currentCol - 1 < 0 ||
                matrix[currentRow][currentCol - 1] !== 0) {
                index = 3;
                currentRow--;
            } else {
                currentCol--;
            }
        } else if (directions[index] === 'up') {

            if (currentRow - 1 < 0 ||
                matrix[currentRow - 1][currentCol] !== 0) {
                index = 0;
                currentCol++;
            } else {
                currentRow--;
            }
        }
    }

    console.log(matrix.map((row) => row.join(' ')).join('\n'));
}
