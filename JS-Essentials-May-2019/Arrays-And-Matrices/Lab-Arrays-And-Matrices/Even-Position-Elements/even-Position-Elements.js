function evenPositionElements(params) {
    console.log(params.filter((_, i) => i % 2 === 0).join(' '));
}
