function solve() {
    const table = document.querySelector('table');
    const message = document.querySelector('#check p');
    const [firstRow, secondRow, thirdRow] = document.querySelectorAll('tbody tr');
    const [checkSudoku, clearSudoku] = document.querySelectorAll('button');

    checkSudoku.addEventListener('click', function () {
        const firstRowInputs = Array.from(new Set(Array.from(firstRow.children).map((x) => +x.children[0].value)));
        const secondRowInputs = Array.from(new Set(Array.from(secondRow.children).map((x) => +x.children[0].value)));
        const thirdRowInputs = Array.from(new Set(Array.from(thirdRow.children).map((x) => +x.children[0].value)));

        const firstColumn = new Set([firstRowInputs[0], secondRowInputs[0], thirdRowInputs[0]]);
        const secondColumn = new Set([firstRowInputs[1], secondRowInputs[1], thirdRowInputs[1]]);
        const thirdColumn = new Set([firstRowInputs[2], secondRowInputs[2], thirdRowInputs[2]]);

        if (firstRowInputs.length === 3 && secondRowInputs.length === 3 && thirdRowInputs.length === 3 &&
            firstColumn.size === 3 && secondColumn.size === 3 && thirdColumn.size === 3) {
            table.style.border = '2px solid green';
            message.textContent = 'You solve it! Congratulations!';
            message.style.color = 'green';
        } else {
            table.style.border = '2px solid red';
            message.textContent = 'NOP! You are not done yet...';
            message.style.color = 'red';
        }
    });

    clearSudoku.addEventListener('click', function () {
        Array.from(document.querySelectorAll('tbody tr td input')).forEach((x) => (x).value = '');
        table.style.border = 'none';
        message.textContent = '';
    });
}
