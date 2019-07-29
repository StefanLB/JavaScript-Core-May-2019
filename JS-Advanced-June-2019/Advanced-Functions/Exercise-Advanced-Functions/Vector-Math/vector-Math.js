const vectorMath = (function () {

    const add = function () {
        const [[xA, yA], [xB, yB]] = arguments;
        return [xA + xB, yA + yB];
    };

    const multiply = function () {
        const [[xA, yA], scalar] = arguments;
        return [xA * scalar, yA * scalar];
    };

    const length = function () {
        const [[xA, yA]] = arguments;
        return Math.sqrt(xA ** 2 + yA ** 2);
    };

    const dot = function () {
        const [[xA, yA], [xB, yB]] = arguments;
        return xA * xB + yA * yB;
    };

    const cross = function () {
        const [[xA, yA], [xB, yB]] = arguments;
        return xA * yB - yA * xB;
    };

    return { add, multiply, length, dot, cross };
})();
