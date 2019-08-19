class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();
        this.creditCard = creditCard;
        this.wishList = [];
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(fullName) {
        if (fullName.length !== 3) {
            throw new Error('Name must include first name, middle name and last name');
        }

        const [firstName, middleName, lastName] = fullName;
        const pattern = /^[A-Z][a-z]+$/;

        if (!firstName.match(pattern) || !middleName.match(pattern) || !lastName.match(pattern)) {
            throw new Error('Invalid full name');
        }

        this._fullName = { firstName, middleName, lastName };
    }

    get creditCard() {
        return this._creditCard;
    }

    set creditCard(creditCard) {
        this.addCreditCardInfo(creditCard);
    }

    generateIDNumber() {
        const [firstName, middleName, lastName] = Object.values(this.fullName);

        const firstNameFirstLetter = firstName.charCodeAt(0);
        const middleNameLength = middleName.length;
        const lastNameEndsWith = 'aeoiu'.includes(lastName[lastName.length - 1]) ? '8' : '7';

        return 231 * firstNameFirstLetter + 139 * middleNameLength + lastNameEndsWith;
    }

    addCreditCardInfo(creditCard) {

        if (creditCard === undefined) {
            this._creditCard = { cardNumber: 1111, expirationDate: '', securityNumber: 111 };

        } else if (creditCard.length < 3) {
            throw new Error('Missing credit card information');

        } else if (creditCard.length === 3) {
            const [cardNumber, expirationDate, securityNumber] = creditCard;

            if (typeof cardNumber !== 'number' || typeof securityNumber !== 'number') {
                throw new Error('Invalid credit card details');
            }

            this._creditCard = { cardNumber, expirationDate, securityNumber };
        }
    }

    addDestinationToWishList(destination) {
        if (this.wishList.indexOf(destination) > -1) {
            throw new Error('Destination already exists in wishlist');
        }

        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }

    getVacationerInfo() {
        const [firstName, middleName, lastName] = Object.values(this.fullName);

        const output = [`Name: ${firstName} ${middleName} ${lastName}`];
        output.push(`ID Number: ${this.idNumber}`);
        output.push('Wishlist:');
        output.push(this.wishList.length !== 0 ? `${this.wishList.join(', ')}` : 'empty');

        const [cardNumber, expirationDate, securityNumber] = Object.values(this.creditCard);
        output.push(`Credit Card:`);
        output.push(`Card Number: ${cardNumber}`);
        output.push(`Expiration Date: ${expirationDate}`);
        output.push(`Security Number: ${securityNumber}`);
        return output.join('\n');
    }
}
