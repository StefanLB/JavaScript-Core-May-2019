function sortArray(params) {
    params
        .sort(function (a, b) {
            return a.length - b.length || a.localeCompare(b);
        }).forEach(function (element) {
            console.log(element);
        });
}
