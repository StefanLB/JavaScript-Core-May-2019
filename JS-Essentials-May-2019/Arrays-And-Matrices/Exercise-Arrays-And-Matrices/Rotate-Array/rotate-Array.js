function rotateArray(params) {
    const rotations = Number(params.pop());

    for (let i = 0; i < rotations % params.length; i++) {
        params.unshift(params.pop());
    }

    console.log(params.join(' '));
}
