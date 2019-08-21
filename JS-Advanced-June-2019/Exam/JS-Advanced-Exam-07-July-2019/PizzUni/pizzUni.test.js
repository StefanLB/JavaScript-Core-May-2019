const PizzUni = require('./pizzUni');
const assert = require('chai').assert;

describe('PizzUni class tests', () => {

    let pizzUni;
    beforeEach('get clean instance of class', () => {
        pizzUni = new PizzUni();
    });

    describe('functions exist tests', () => {
        it('should has following funtions', () => {
            assert.isTrue(PizzUni.prototype.hasOwnProperty('constructor'));
            assert.isTrue(PizzUni.prototype.hasOwnProperty('registerUser'));
            assert.isTrue(PizzUni.prototype.hasOwnProperty('makeAnOrder'));
            assert.isTrue(PizzUni.prototype.hasOwnProperty('detailsAboutMyOrder'));
            assert.isTrue(PizzUni.prototype.hasOwnProperty('doesTheUserExist'));
            assert.isTrue(PizzUni.prototype.hasOwnProperty('completeOrder'));
        });
    });

    describe('properties exist tests', () => {
        it('should has following default values', () => {
            assert.equal(JSON.stringify(pizzUni.registeredUsers), '[]');
            assert.equal(JSON.stringify(pizzUni.availableProducts),
                '{"pizzas":["Italian Style","Barbeque Classic","Classic Margherita"],"drinks":["Coca-Cola","Fanta","Water"]}');
            assert.equal(JSON.stringify(pizzUni.orders), '[]');
        });
    });

    describe('registerUser method tests', () => {
        it('should register user', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            assert.equal(JSON.stringify(pizzUni.registeredUsers), `[{"email":"${email}","orderHistory":[]}]`);
        });

        it('should throw error when user exists', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            const err = () => pizzUni.registerUser(email);
            assert.throws(err, `This email address (${email}) is already being used!`);
        });
    });

    describe('makeAnOrder method tests', () => {
        it('should throw an error when user does not exist', () => {
            const email = 'sample@abv.bg';
            const err = () => pizzUni.makeAnOrder(email, 'some pizza', 'some drink');
            assert.throws(err, 'You must be registered to make orders!');
        });

        it('should throw an err for wrong type of pizza', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            const err = () => pizzUni.makeAnOrder(email, 'some pizza', 'some drink');
            assert.throws(err, 'You must order at least 1 Pizza to finish the order.');
        });

        it('should work with single order', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            assert.equal(pizzUni.makeAnOrder(email, 'Italian Style', 'Coca-Cola'), 0);
        });
    });

    describe('completeOrder method tests', () => {
        it('should work with correct params', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            pizzUni.makeAnOrder(email, 'Barbeque Classic', 'Fanta');
            assert.equal(JSON.stringify(pizzUni.completeOrder()),
                `{"orderedPizza":"Barbeque Classic","orderedDrink":"Fanta","email":"${email}","status":"completed"}`);
        });

        it('should return undefined when orders do not exist', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            assert.isUndefined(JSON.stringify(pizzUni.completeOrder()));
        });
    });

    describe('detailsAboutMyOrder method tests', () => {
        it('should return pending when order is pending', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            pizzUni.makeAnOrder(email, 'Classic Margherita', 'Water');
            assert.equal(pizzUni.detailsAboutMyOrder(0), 'Status of your order: pending');
        });

        it('should return completed when order is completed', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            pizzUni.makeAnOrder(email, 'Classic Margherita', 'Water');
            pizzUni.completeOrder();
            assert.equal(pizzUni.detailsAboutMyOrder(0), 'Status of your order: completed');
        });

        it('should return undefined when order does not exist', () => {
            assert.isUndefined(pizzUni.detailsAboutMyOrder(0));
        });
    });

    describe('doesTheUserExist method tests', () => {
        it('should work with correct params', () => {
            const email = 'sample@abv.bg';
            pizzUni.registerUser(email);
            pizzUni.makeAnOrder(email, 'Italian Style', 'Coca-Cola')
            assert.equal(JSON.stringify(pizzUni.doesTheUserExist(email)),
                `{"email":"${email}","orderHistory":[{"orderedPizza":"Italian Style","orderedDrink":"Coca-Cola"}]}`);
        });

        it('should return undefined when user does not exist', () => {
            const email = 'sample@abv.bg';
            assert.isUndefined(pizzUni.doesTheUserExist(email));
        });
    });
});
