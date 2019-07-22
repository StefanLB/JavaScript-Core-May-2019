function gladiatorInventory(inputArr) {
    let allItems = inputArr.shift().split(' ');

    inputArr.forEach((element) => {
        let [command, currentItem] = element.split(' ');
        let index = allItems.indexOf(currentItem);

        if (command === 'Buy' && index === -1) {
            allItems.push(currentItem);

        } else if (command === 'Trash' && index !== -1) {
            allItems.splice(index, 1);

        } else if (command === 'Repair' && index !== -1) {
            allItems.splice(index, 1);
            allItems.push(currentItem);

        } else if (command === 'Upgrade') {
            let upgradeItem = currentItem.split('-')[0];
            let upgradeIndex = allItems.indexOf(upgradeItem);

            if (upgradeIndex !== - 1) {
                allItems.splice(upgradeIndex + 1, 0, currentItem.replace('-', ':'));
            }
        }
    });

    console.log(allItems.join(' '));
}
