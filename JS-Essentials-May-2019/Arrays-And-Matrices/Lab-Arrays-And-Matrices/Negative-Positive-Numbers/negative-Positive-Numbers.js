function negativePositiveNumbers(params) {
    params
        .reduce(function (accumulator, element) {

            if (element < 0) {
                accumulator.unshift(element);
            } else if (element >= 0) {
                accumulator.push(element);
            }

            return accumulator;
        }, [])
        .forEach(function (element) {
            console.log(element);
        });
}
