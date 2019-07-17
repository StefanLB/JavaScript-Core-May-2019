function validityChecker([x1, y1, x2, y2]) {

    const comparisons = function ([x1, y1, x2, y2]) {
        const [x, y] = [x1 - x2, y1 - y2];
        const distance = Math.sqrt(x ** 2 + y ** 2);
        const distanceIs = Number.isInteger(distance) ? 'valid' : 'invalid';
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${distanceIs}`);
    };

    comparisons([x1, y1, 0, 0]);
    comparisons([x2, y2, 0, 0]);
    comparisons([x1, y1, x2, y2]);
}
