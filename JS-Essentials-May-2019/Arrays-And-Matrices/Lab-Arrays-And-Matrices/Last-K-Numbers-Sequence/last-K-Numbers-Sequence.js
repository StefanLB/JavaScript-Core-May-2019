function lastKNumbersSequence(number, count) {
    const lastNumbers = [1];

    for (let index = 1; index < number; index++) {
        const start = Math.max(0, index - count);
        const sum = lastNumbers.slice(start, index)
            .reduce((a, b) => a + b, 0)
        lastNumbers.push(sum);
    }

    console.log(lastNumbers.join(' '));
}
