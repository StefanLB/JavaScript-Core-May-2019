function sameNumbers(number) {
    const numbersList = number.toString().split('').map((x) => +x);
    const areEqual = numbersList.every((v, i, s) => v === s[0]);
    const digitsSum = numbersList.reduce((a, b) => a + b, 0);
    console.log(`${areEqual}\n${digitsSum}`);
}
