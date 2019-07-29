function sortArray() {

    const actions = {
        asc: function (a, b) {
            return a - b;
        },
        desc: function (a, b) {
            return b - a;
        }
    };

    const [numbersList, criteria] = arguments;
    return numbersList.sort(actions[criteria]);
}
