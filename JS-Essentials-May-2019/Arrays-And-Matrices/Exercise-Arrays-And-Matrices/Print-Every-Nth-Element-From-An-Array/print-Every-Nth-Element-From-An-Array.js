function printEveryNthElementFromAnArray(params) {
    const step = params.pop();
    params
        .filter(function (_, index) {
            return index % step === 0
        })
        .forEach(function (element) {
            console.log(element);
        });
}
