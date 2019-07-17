function circleArea(param) {
    const type = typeof param;
    console.log(type === 'number'
        ? (Math.PI * param * param).toFixed(2)
        : `We can not calculate the circle area, because we receive a ${type}.`);
}
