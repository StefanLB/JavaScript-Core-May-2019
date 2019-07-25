function matrixSummer(firstMatrix, secondMatrix) {
    let [thirdMatrix, remainder] = [[], 0];

    for (let row = 0; row < firstMatrix.length; row++) {
        thirdMatrix.push([]);

        for (let col = 0; col < firstMatrix[row].length; col++) {

            let firstDigit = Number(firstMatrix[row][col]);
            let secondDigit = Number(secondMatrix[row][col]);
            let thirdDigit = firstDigit + secondDigit + remainder;

            if (thirdDigit > 9) {
                thirdMatrix[row][col] = 9;
                remainder = thirdDigit - 9;

            } else if (thirdDigit <= 9) {
                thirdMatrix[row][col] = thirdDigit;
                remainder = 0;
            }
        }

        while (remainder > 0) {
            if (remainder > 9) {
                thirdMatrix[row][thirdMatrix[row].length] = 9;
                remainder -= 9;

            } else if (remainder <= 9) {
                thirdMatrix[row][thirdMatrix[row].length] = remainder;
                remainder = 0;
            }
        }
    }

    console.log(JSON.stringify(thirdMatrix));
}
