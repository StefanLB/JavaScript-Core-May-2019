function aggregateElements(params) {
    const compute = {
        sum: function (array) {
            return array.reduce((a, b) => a + b, 0);
        },
        inverse: function (array) {
            return array.reduce((a, b) => a + 1 / b, 0);
        },
        concat: function (array) {
            return array.reduce((a, b) => a + b, '');
        }
    };

    console.log(compute.sum(params));
    console.log(compute.inverse(params));
    console.log(compute.concat(params));
}
