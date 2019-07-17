function firstAndLastKNumbers(params) {
    const count = params.shift();
    const firstNumbers = params.slice(0, count);
    const lastNumbers = params.slice(-count);
    console.log(firstNumbers.join(' '));
    console.log(lastNumbers.join(' '));
}
