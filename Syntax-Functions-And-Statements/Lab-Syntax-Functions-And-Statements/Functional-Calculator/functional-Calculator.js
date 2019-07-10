function functionalCalculator(firstNumber, secondNumber, operator) {
    const compute = {
        '+': function (firstNumber, secondNumber) {
            return firstNumber + secondNumber;
        },
        '-': function (firstNumber, secondNumber) {
            return firstNumber - secondNumber;
        },
        '*': function (firstNumber, secondNumber) {
            return firstNumber * secondNumber;
        },
        '/': function (firstNumber, secondNumber) {
            return firstNumber / secondNumber;
        },
        '%': function (firstNumber, secondNumber) {
            return firstNumber % secondNumber;
        },
        '**': function (firstNumber, secondNumber) {
            return firstNumber ** secondNumber;
        }
    };

    console.log(compute[operator](firstNumber, secondNumber));
}
