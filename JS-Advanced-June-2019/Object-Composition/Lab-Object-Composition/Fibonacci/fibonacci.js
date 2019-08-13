function getFibonator() {
    let [firstFib, secondFib] = [0, 1];

    return function () {
        let sum = firstFib + secondFib;
        firstFib = secondFib;
        secondFib = sum;
        return firstFib;
    }
}
