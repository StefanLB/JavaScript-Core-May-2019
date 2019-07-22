function bitcoinMining(inputArr) {
    let [bitcoinsPrice, goldsPrice] = [11949.16, 67.51];
    let [sum, day] = [0, 0];
    let shiftsArr = inputArr.map((x) => +x);

    for (let i = 0; i < shiftsArr.length; i++) {

        let currentGold = shiftsArr[i];
        if ((i + 1) % 3 === 0) {
            currentGold *= 0.7;
        }

        sum += currentGold * goldsPrice;
        if (sum >= bitcoinsPrice && day === 0) {
            day = i + 1;
        }
    }

    let bitcoins = Math.trunc(sum / bitcoinsPrice);
    console.log(`Bought bitcoins: ${bitcoins}`);

    if (day !== 0) {
        console.log(`Day of the first purchased bitcoin: ${day}`);
    }

    let leftSum = (sum - bitcoins * bitcoinsPrice).toFixed(2);
    console.log(`Left money: ${leftSum} lv.`);
}
