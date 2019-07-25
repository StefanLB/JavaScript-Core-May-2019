function atmMachine(input) {
    let machines = [];

    for (let commands of input) {

        if (commands.length > 2) {
            let inserted = commands.reduce((a, b) => a + b, 0);
            machines.push(...commands);
            let totalSum = machines.reduce((a, b) => a + b, 0);
            console.log(`Service Report: ${inserted}$ inserted. Current balance: ${totalSum}$.`);

        } else if (commands.length === 2) {
            let [balance, withdraw] = commands;
            let totalSum = machines.reduce((a, b) => a + b, 0);

            if (balance < withdraw) {
                console.log(`Not enough money in your account. Account balance: ${balance}$.`);
            } else if (totalSum < withdraw) {
                console.log(`ATM machine is out of order!`);
            } else {

                balance -= withdraw;
                let transaction = withdraw;
                machines.sort((a, b) => b - a);
                let i = 0;

                while (transaction > 0) {
                    let banknote = machines[i];
                    
                    if (banknote <= transaction) {
                        transaction -= machines.splice(i, 1);

                    } else {
                        i++;
                    }
                }

                console.log(`You get ${withdraw}$. Account balance: ${balance}$. Thank you!`);
            }
        } else if (commands.length === 1) {
            let banknote = commands[0];
            let count = machines.filter((x) => x === banknote).length;
            console.log(`Service Report: Banknotes from ${banknote}$: ${count}.`);
        }
    }
}
