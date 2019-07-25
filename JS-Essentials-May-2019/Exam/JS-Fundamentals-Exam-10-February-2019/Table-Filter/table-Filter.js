function tableFilter(matrix, command) {

    if (command.indexOf('hide') > -1) {
        const header = command.split(/\s+/)[1];

        const index = matrix[0].indexOf(header);

        const result = [];
        matrix.forEach((row, rowIndex) => {
            result.push([]);

            row.forEach((column, colIndex) => {
                if (colIndex !== index) {
                    result[rowIndex].push(column);
                }
            });
        });

        result.forEach((row) => {
            console.log(row.join(' | '));
        });
    } else if (command.indexOf('sort') > -1) {
        const header = command.split(/\s+/)[1];

        const index = matrix[0].indexOf(header);
        const line = matrix.shift();
        matrix.sort((a, b) => {
            const first = a[index];
            const second = b[index];
            return first.localeCompare(second);
        });

        console.log(line.join(' | '));
        matrix.forEach((row) => {
            console.log(row.join(' | '));
        });
    } else if (command.indexOf('filter') > -1) {
        const [header, value] = command.split(/\s+/).slice(1);

        const index = matrix[0].indexOf(header);
        const result = matrix.slice(1).filter((row) => row[index] === value);

        console.log(matrix[0].join(' | '));
        result.forEach((row) => {
            console.log(row.join(' | '));
        });
    }
}
