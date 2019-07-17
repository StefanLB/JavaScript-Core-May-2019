function diagonalAttack(params) {
    let matrix = params.map((row) => row.split(' ').map((x) => +x));
    let [leftDiagonalSum, rightDiagonalSum] = [0, 0];

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {

            if (row === col) {
                leftDiagonalSum += matrix[row][col];
            }

            if (row + col === matrix[row].length - 1) {
                rightDiagonalSum += matrix[row][col];
            }
        }

    }

    if (leftDiagonalSum === rightDiagonalSum) {

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {

                if (row !== col && row + col !== matrix[row].length - 1) {
                    matrix[row][col] = rightDiagonalSum;
                }
            }
        }
    }

    console.log(matrix.map((row) => row.join(' ')).join('\n'));
}
