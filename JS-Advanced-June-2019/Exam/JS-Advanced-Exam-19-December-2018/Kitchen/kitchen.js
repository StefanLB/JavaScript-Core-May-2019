class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        products.forEach((element) => {

            const productName = element.split(/\s+/).slice(0, -2).join(' ');
            const quantity = Number(element.split(/\s+/).slice(-2, -1)[0]);
            const price = Number(element.split(/\s+/).slice(-1)[0]);

            if (this.budget >= price) {
                this.budget -= price;

                if (!this.productsInStock.hasOwnProperty(productName)) {
                    this.productsInStock[productName] = 0;
                }

                this.productsInStock[productName] += quantity;
                this.actionsHistory.push(`Successfully loaded ${quantity} ${productName}`);
            } else {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${productName}`);
            }
        });

        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, neededProducts, price) {

        if (this.menu.hasOwnProperty(meal)) {
            return `${meal} is already in our menu, try something different.`;
        }

        this.menu[meal] = { products: neededProducts, price };
        return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
    }

    showTheMenu() {

        if (Object.keys(this.menu).length === 0) {
            return 'Our menu is not ready yet, please come later...';
        }

        const output = Object.entries(this.menu).map(([name, info]) => `${name} - $ ${info.price}`);
        return output.join('\n') + '\n';
    }

    makeTheOrder(meal) {

        if (!this.menu.hasOwnProperty(meal)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }

        for (const element of this.menu[meal].products) {
            const productName = element.split(/\s+/).slice(0, -1).join(' ');
            const quantityNeeded = Number(element.split(/\s+/).slice(-1).join(' '));

            if (!this.productsInStock.hasOwnProperty(productName) || this.productsInStock[productName] < quantityNeeded) {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }
        }

        this.menu[meal].products.forEach((element) => {
            const productName = element.split(/\s+/).slice(0, -1).join(' ');
            const productQuantity = element.split(/\s+/).slice(-1).join(' ');
            this.productsInStock[productName] -= Number(productQuantity);
        });

        let price = Number(this.menu[meal].price);
        this.budget += price;
        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${price}.`
    }
}
