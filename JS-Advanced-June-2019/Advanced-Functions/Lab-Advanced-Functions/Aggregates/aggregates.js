function aggregates() {
    const actions = {
        sum: function (array) {
            return array[0].reduce((a, b) => a + b, 0);
        },
        min: function (array) {
            return array[0].reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER);
        },
        max: function (array) {
            return array[0].reduce((a, b) => Math.max(a, b), Number.MIN_SAFE_INTEGER);
        },
        product: function (array) {
            return array[0].reduce((a, b) => a * b, 1);
        },
        join: function (array) {
            return array[0].reduce((a, b) => a + b, '');
        }
    }

    console.log(`Sum = ${actions.sum(arguments)}`);
    console.log(`Min = ${actions.min(arguments)}`);
    console.log(`Max = ${actions.max(arguments)}`);
    console.log(`Product = ${actions.product(arguments)}`);
    console.log(`Join = ${actions.join(arguments)}`);
}
