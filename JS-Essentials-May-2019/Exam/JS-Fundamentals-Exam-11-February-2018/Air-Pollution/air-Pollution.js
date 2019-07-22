function airPollution(inputMat, commands) {
    let matrix = [];
    inputMat.forEach((row) => {
        matrix.push(row.split(' ').map((x) => +x));
    });

    let commandsObj = {
        breeze: function (index) {
            for (let col = 0; col < matrix.length; col++) {
                matrix[index][col] = Math.max(0, matrix[index][col] - 15);
            }
        },
        gale: function (index) {
            for (let row = 0; row < matrix.length; row++) {
                matrix[row][index] = Math.max(0, matrix[row][index] - 20);
            }
        },
        smog: function (value) {
            for (let row = 0; row < matrix.length; row++) {
                for (let col = 0; col < matrix[row].length; col++) {
                    matrix[row][col] += value;
                }
            }
        }
    };

    commands.forEach((tokens) => {
        let [command, digit] = tokens.split(' ');
        commandsObj[command](+digit);
    });

    let pollutedArr = [];
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {

            let element = matrix[row][col];
            if (element >= 50) {
                pollutedArr.push(`[${row}-${col}]`);
            }
        }
    }

    console.log(pollutedArr.length > 0
        ? `Polluted areas: ${pollutedArr.join(', ')}`
        : 'No polluted areas');
}
