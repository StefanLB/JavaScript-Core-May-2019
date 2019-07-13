function solve() {
    const pattern = /(\d+(?:\.\d+)?)\s([+\-*/])\s(\d+(?:\.\d+)?)/;
    const expressionOutput = document.querySelector('p#expressionOutput');
    const resultOutput = document.querySelector('p#resultOutput');

    Array.from(document.querySelectorAll('button')).forEach((x) => x.addEventListener('click', showData));
    document.querySelector('button[value="="]').addEventListener('click', displayData);
    document.querySelector('button[value="Clear"]').addEventListener('click', clearData);

    const compute = {
        '+': (leftOperand, rightOperand) => leftOperand + rightOperand,
        '-': (leftOperand, rightOperand) => leftOperand - rightOperand,
        '*': (leftOperand, rightOperand) => leftOperand * rightOperand,
        '/': (leftOperand, rightOperand) => leftOperand / rightOperand
    };

    function showData() {
        if (this.value === '=') {
            return;
        } else if (this.value === '+' || this.value === '-' || this.value === '*' || this.value === '/') {
            expressionOutput.textContent += ` ${this.value} `;
        } else {
            expressionOutput.textContent += this.value;
        }
    }

    function displayData() {
        const isReady = expressionOutput.textContent.match(pattern);

        if (isReady) {
            const [leftOperand, operator, rightOperand] = isReady.slice(1);
            resultOutput.textContent = compute[operator](+leftOperand, +rightOperand);
        } else if (!isReady) {
            resultOutput.textContent = 'NaN';
        }
    }

    function clearData() {
        [expressionOutput.textContent, resultOutput.textContent] = ['', ''];
    }
}
