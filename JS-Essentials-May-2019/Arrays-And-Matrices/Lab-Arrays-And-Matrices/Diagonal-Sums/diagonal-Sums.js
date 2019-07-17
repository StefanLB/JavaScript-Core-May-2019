function diagonalSums(matrix) {
    let [mainSum, secondarySum] = [0, 0];

    for (let row = 0; row < matrix.length; row++) {
        mainSum += matrix[row][row];
        secondarySum += matrix[row][matrix.length - row - 1];
    }

    console.log(`${mainSum} ${secondarySum}`);
}
