function plasmaGiants(plasma, cutSize) {
    const length = plasma.length;
    let firstGiant = plasma.slice(0, length / 2);
    let secondGiant = plasma.slice(length / 2);

    let firstCut = [];
    while (firstGiant.length > 0) {
        let temp = firstGiant.splice(0, cutSize);
        firstCut.push(temp);
    }

    let secondCut = [];
    while (secondGiant.length > 0) {
        let temp = secondGiant.splice(0, cutSize);
        secondCut.push(temp);
    }

    let firstProduct = firstCut.map((array) => array.reduce((a, b) => a * b, 1));
    let secondProduct = secondCut.map((array) => array.reduce((a, b) => a * b, 1));
    let firstPoints = firstProduct.reduce((a, b) => a + b, 0);
    let secondPoints = secondProduct.reduce((a, b) => a + b, 0);

    let smallestNumber = Math.min(...plasma);
    let biggestNumber = Math.max(...plasma);
    let rounds = 1;

    while (firstPoints > biggestNumber && secondPoints > biggestNumber && smallestNumber !== 0) {
        firstPoints -= smallestNumber;
        secondPoints -= smallestNumber;
        rounds++;
    }

    if (firstPoints > secondPoints) {
        console.log(`First Giant defeated Second Giant with` + ' ' +
            `result ${firstPoints} - ${secondPoints} in ${rounds} rounds`);

    } else if (firstPoints < secondPoints) {
        console.log(`Second Giant defeated First Giant with` + ' ' +
            `result ${secondPoints} - ${firstPoints} in ${rounds} rounds`);

    } else if (firstPoints === secondPoints) {
        console.log(`Its a draw ${firstPoints} - ${secondPoints}`);
    }
}
