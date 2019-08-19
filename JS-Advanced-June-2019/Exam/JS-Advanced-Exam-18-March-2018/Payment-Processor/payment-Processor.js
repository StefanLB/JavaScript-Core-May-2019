class PaymentProcessor {
    constructor(options) {
        this.options = options;
        this.payments = {};
    }

    get options() {
        return this._options;
    }

    set options(options) {
        this.setOptions(options);
    }

    registerPayment(id, name, type, value) {
        if (id === '' || typeof id !== 'string' || this.payments.hasOwnProperty(id)) {
            throw new Error('Invalid id.');
        } else if (name === '' || typeof id !== 'string') {
            throw new Error('Invalid name.');
        } else if (type === '' || typeof id !== 'string' || this.options.types.indexOf(type) === -1) {
            throw new Error('Invalid type.');
        } else if (typeof value !== 'number') {
            throw new Error('Invalid value.');
        }

        this.payments[id] = { name, type, value };
    }

    deletePayment(id) {
        if (!this.payments.hasOwnProperty(id)) {
            throw new Error('ID not found');
        }

        delete this.payments[id];
    }

    get(id) {
        if (!this.payments.hasOwnProperty(id)) {
            throw new Error('ID not found');
        }

        const output = [
            `Details about payment ID: ${id}`,
            `- Name: ${this.payments[id].name}`,
            `- Type: ${this.payments[id].type}`,
            `- Value: ${this.payments[id].value.toFixed(this.options.precision)}`
        ];

        return output.join('\n');
    }

    setOptions(options) {
        if (options === undefined) {
            this._options = { types: ["service", "product", "other"], precision: 2 };

        } else if (options) {
            this._options = options;
            this._options.types = options.types || ["service", "product", "other"];
            this._options.precision = options.precision || 2;
        }
    }

    toString() {
        const payment = Object.keys(this.payments).length;
        const balance = Object.values(this.payments).reduce((a, b) => a + b.value, 0);

        const output = [
            'Summary:',
            `- Payments: ${payment}`,
            `- Balance: ${balance.toFixed(this._options.precision)}`
        ];

        return output.join('\n');
    }
}
