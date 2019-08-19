const SubscriptionCard = require('./subscription-Card');
const assert = require('chai').assert;

describe('SubscriptionCard class tests', () => {

    let subscriptionCard;
    beforeEach('get clean instance of class', () => {
        subscriptionCard = new SubscriptionCard('Radoslav', 'Mihalev', '123-45-6789');
    });

    describe('functions exist tests', () => {
        it('should has following functions', () => {
            assert.isTrue(SubscriptionCard.prototype.hasOwnProperty('constructor'));
            assert.isTrue(SubscriptionCard.prototype.hasOwnProperty('addSubscription'));
            assert.isTrue(SubscriptionCard.prototype.hasOwnProperty('isValid'));
            assert.isTrue(SubscriptionCard.prototype.hasOwnProperty('block'));
            assert.isTrue(SubscriptionCard.prototype.hasOwnProperty('unblock'));
        });
    });

    describe('accessors exist tests', () => {
        it('should has following accessors', () => {
            assert.equal(subscriptionCard.firstName, 'Radoslav');
            assert.equal(subscriptionCard.lastName, 'Mihalev');
            assert.equal(subscriptionCard.SSN, '123-45-6789');
            assert.isFalse(subscriptionCard.isBlocked);
        });
        it('should not change default firstName value', () => {
            subscriptionCard.firstName = 'Paul';
            assert.equal(subscriptionCard.firstName, 'Radoslav');
        });
        it('should not change default lastName value', () => {
            subscriptionCard.lastName = 'Kalkbrenner';
            assert.equal(subscriptionCard.lastName, 'Mihalev');
        });
        it('should not change default SSN value', () => {
            subscriptionCard.SSN = '987-65-4321';
            assert.equal(subscriptionCard.SSN, '123-45-6789');
        });
    });

    describe('default values tests', () => {
        it('should has following default values', () => {
            assert.equal(subscriptionCard._firstName, 'Radoslav');
            assert.equal(subscriptionCard._lastName, 'Mihalev');
            assert.equal(subscriptionCard._SSN, '123-45-6789');
            assert.equal(JSON.stringify(subscriptionCard._subscriptions), JSON.stringify([]));
            assert.isFalse(subscriptionCard._blocked);
        });
        it('initialization tests', () => {
            assert.deepEqual(subscriptionCard,
                { _firstName: 'Radoslav', _lastName: 'Mihalev', _SSN: '123-45-6789', _subscriptions: [], _blocked: false });
        });
    });

    describe('addSubscription function tests', () => {
        it('should add with a string line property', () => {
            subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.equal(JSON.stringify(subscriptionCard._subscriptions[0]),
                '{"line":"120","startDate":"2018-04-22T00:00:00.000Z","endDate":"2018-05-21T00:00:00.000Z"}');
        });
        it('should add with a asterisk line property', () => {
            subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            assert.equal(JSON.stringify(subscriptionCard._subscriptions[0]),
                '{"line":"*","startDate":"2018-05-25T00:00:00.000Z","endDate":"2018-06-24T00:00:00.000Z"}');
        });
    });

    describe('isValid function tests', () => {
        it('should return true for valid params', () => {
            subscriptionCard.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            assert.isTrue(subscriptionCard.isValid('120', new Date('2018-04-22')));
        });
        it('should return true for valid params', () => {
            subscriptionCard.addSubscription('*', new Date('2019-06-09'), new Date('2019-07-07'));
            assert.isTrue(subscriptionCard.isValid('*', new Date('2019-07-07')));
        });
        it('should return false for blocked value', () => {
            subscriptionCard.block();
            subscriptionCard.addSubscription('120', new Date('2019-06-09'), new Date('2019-07-07'));
            assert.isFalse(subscriptionCard.isValid('120', new Date('2019-07-07')));
        });
        it('should return false for invalid params', () => {
            subscriptionCard.addSubscription('*', new Date('2019-06-09'), new Date('2019-07-07'));
            assert.isFalse(subscriptionCard.isValid('*', new Date('2019-07-16')));
        });
    });

    describe('block function tests', () => {
        it('should change value to true', () => {
            subscriptionCard.block();
            assert.isTrue(subscriptionCard._blocked);
        });
        it('should change value to true', () => {
            subscriptionCard.block();
            subscriptionCard.unblock();
            subscriptionCard.block();
            assert.isTrue(subscriptionCard._blocked);
        });
    });

    describe('unblock function tests', () => {
        it('should change value to false', () => {
            subscriptionCard.unblock();
            assert.isFalse(subscriptionCard._blocked);
        });
        it('should change value to false', () => {
            subscriptionCard.unblock();
            subscriptionCard.block();
            subscriptionCard.unblock();
            assert.isFalse(subscriptionCard._blocked);
        });
    });
});
