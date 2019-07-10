function stringLength(strOne, strTwo, strThree) {
    const fullLength = strOne.length + strTwo.length + strThree.length;
    const averageLength = Math.trunc(fullLength / 3);
    console.log(`${fullLength}\n${averageLength}`);
}
