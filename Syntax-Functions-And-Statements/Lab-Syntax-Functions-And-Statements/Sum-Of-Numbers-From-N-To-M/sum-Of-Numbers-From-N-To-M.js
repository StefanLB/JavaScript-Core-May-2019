function sumOfNumbersFromNToM(n, m) {
    const digits = [];
    for (let i = Number(n); i <= Number(m); i++) {
        digits.push(i);
    }

    console.log(digits.reduce((a, b) => a + b, 0));
}
