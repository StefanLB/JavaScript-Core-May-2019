const createCalculator = require('./add-Subtract').createCalculator;
const assert = require('chai').assert;

describe('createCalculator function tests', () => {

    let calculator;
    beforeEach('get fresh calculator', () => {
        calculator = createCalculator();
    });

    it('should return true for object', () => {
        assert.isObject(calculator);
    });
    it('should return true for function', () => {
        assert.isFunction(calculator.add);
    });
    it('should return true for function', () => {
        assert.isFunction(calculator.subtract);
    });
    it('should return true for function', () => {
        assert.isFunction(calculator.get);
    });

    it('should return 0 for get()', () => {
        calculator.get();
    });
    it('should return 7 for add(7)', () => {
        calculator.add(7);
        assert.equal(calculator.get(), 7);
    });
    it('should return 16 for add("7"), add("9")', () => {
        calculator.add("7");
        calculator.add("9");
        assert.equal(calculator.get(), 16);
    });
    it('should return NaN for add("code")', () => {
        calculator.add('code');
        assert.isNaN(calculator.get());
    });
    it('should return -7 for subtract(7)', () => {
        calculator.subtract(7);
        assert.equal(calculator.get(), -7);
    });
    it('should return -16 for subtract("7"), subtract("9")', () => {
        calculator.subtract("7");
        calculator.subtract("9");
        assert.equal(calculator.get(), -16);
    });
    it('should return x for add(40), subtract(30), add(20), subtract(10)', () => {
        calculator.add(40);
        calculator.subtract(30);
        calculator.add(20);
        calculator.subtract(10);
        assert.equal(calculator.get(), 20);
    });
});
