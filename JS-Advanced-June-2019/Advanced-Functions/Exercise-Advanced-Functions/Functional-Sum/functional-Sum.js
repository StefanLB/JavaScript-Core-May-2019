(function () {
    let sum = 0;

    return function add() {
        sum += arguments[0];

        add.toString = function () {
            return sum;
        }

        return add;
    }
})();
