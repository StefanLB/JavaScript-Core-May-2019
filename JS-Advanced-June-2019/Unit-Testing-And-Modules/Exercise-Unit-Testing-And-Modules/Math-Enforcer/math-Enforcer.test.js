const mathEnforcer = require('./math-Enforcer').mathEnforcer;
const assert = require('chai').assert;

describe('mathEnforcer function tests', () => {

    describe('object and methods tests', () => {
        it('should return true for an object', () => {
            assert.isObject(mathEnforcer);
        });
        it('should return true for a function', () => {
            assert.isFunction(mathEnforcer.addFive);
        });
        it('should return true for a function', () => {
            assert.isFunction(mathEnforcer.subtractTen);
        });
        it('should return true for a function', () => {
            assert.isFunction(mathEnforcer.sum);
        });
    });

    describe('addFive method tests', () => {
        it('should return undefined for addFive({ a: 5 })', () => {
            assert.isUndefined(mathEnforcer.addFive({ a: 5 }));
        });
        it('should return 10 for addFive(5)', () => {
            assert.equal(mathEnforcer.addFive(5), 10);
        });
        it('should return -10 for addFive(-15)', () => {
            assert.equal(mathEnforcer.addFive(-15), -10);
        });
        it('should return 8.3 for addFive(3.3)', () => {
            assert.closeTo(mathEnforcer.addFive(3.3), 8.3, 0.01);
        });
    });

    describe('subtractTen method tests', () => {
        it('should return undefined for subtractTen({ a: 5 })', () => {
            assert.isUndefined(mathEnforcer.subtractTen({ a: 5 }));
        });
        it('should return 5 for subtractTen(15)', () => {
            assert.equal(mathEnforcer.subtractTen(15), 5);
        });
        it('should return -15 for subtractTen(-5)', () => {
            assert.equal(mathEnforcer.subtractTen(-5), -15);
        });
        it('should return 3.3 for subtractTen(13.3)', () => {
            assert.closeTo(mathEnforcer.subtractTen(13.3), 3.3, 0.01);
        });
    });

    describe('sum method tests', () => {
        it('should return undefined for sum({ a: 5 }, 8)', () => {
            assert.isUndefined(mathEnforcer.sum({ a: 5 }, 8));
        });
        it('should return undefined for sum(8, { a: 5 })', () => {
            assert.isUndefined(mathEnforcer.sum(8, { a: 5 }));
        });
        it('should return undefined for sum("java", "script")', () => {
            assert.isUndefined(mathEnforcer.sum("java", "script"));
        });
        it('should return 11 for sum(5, 6)', () => {
            assert.equal(mathEnforcer.sum(5, 6), 11);
        });
        it('should return -11 for sum(-5, -6)', () => {
            assert.equal(mathEnforcer.sum(-5, -6), -11);
        });
        it('should return 3.3 for sum(1.1, 2.2)', () => {
            assert.closeTo(mathEnforcer.sum(1.1, 2.2), 3.3, 0.01);
        });
    });
});
