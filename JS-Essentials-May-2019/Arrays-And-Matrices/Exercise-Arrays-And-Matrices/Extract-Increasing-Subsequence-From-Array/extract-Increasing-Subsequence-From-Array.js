function extractIncreasingSubsequenceFromArray(params) {
    let minNumber = Number.MIN_SAFE_INTEGER;

    const output = params
        .reduce((accumulator, number) => {
            
            if (number >= minNumber) {
                minNumber = number;
                accumulator.push(number);
            }

            return accumulator;
        }, []);

    console.log(output.join('\n'));
}
