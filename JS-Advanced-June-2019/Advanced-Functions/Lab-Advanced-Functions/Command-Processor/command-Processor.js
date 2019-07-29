function commandProcessor() {
    let internalStr = '';

    const append = function (text) {
        internalStr += text;
    }

    const removeStart = function (count) {
        internalStr = internalStr.slice(+count);
    }

    const removeEnd = function (count) {
        internalStr = internalStr.slice(0, -count);
    }

    const print = function () {
        console.log(internalStr);
    }

    return {
        append,
        removeStart,
        removeEnd,
        print
    };
}
