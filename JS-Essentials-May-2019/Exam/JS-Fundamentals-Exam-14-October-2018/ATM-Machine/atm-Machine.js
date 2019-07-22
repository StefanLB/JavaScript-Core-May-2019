function atmMachine(inputMat) {
    let machinesArr = [];

    for (let commandsArr of inputMat) {

        if (commandsArr.length > 2) {

            let inserted = commandsArr.reduce((a, b) => a + b, 0);
            machinesArr.push(...commandsArr);
            let totalSum = machinesArr.reduce((a, b) => a + b, 0);
            console.log(`Service Report: ${inserted}$ inserted. Current balance: ${totalSum}$.`);

        } else if (commandsArr.length === 2) {

            let [balance, withdraw] = commandsArr;
            let totalSum = machinesArr.reduce((a, b) => a + b, 0);

            if (balance < withdraw) {
                console.log(`Not enough money in your account. Account balance: ${balance}$.`);
            } else if (totalSum < withdraw) {
                console.log(`ATM machine is out of order!`);
            } else {

                balance -= withdraw;
                let transaction = withdraw;
                machinesArr.sort((a, b) => b - a);
                let i = 0;

                while (transaction > 0) {

                    let banknote = machinesArr[i];
                    if (banknote <= transaction) {
                        transaction -= machinesArr.splice(i, 1);

                    } else {
                        i++;
                    }
                }

                console.log(`You get ${withdraw}$. Account balance: ${balance}$. Thank you!`);
            }
        } else if (commandsArr.length === 1) {

            let banknote = commandsArr[0];
            let count = machinesArr.filter((x) => x === banknote).length;
            console.log(`Service Report: Banknotes from ${banknote}$: ${count}.`);
        }
    }
}
