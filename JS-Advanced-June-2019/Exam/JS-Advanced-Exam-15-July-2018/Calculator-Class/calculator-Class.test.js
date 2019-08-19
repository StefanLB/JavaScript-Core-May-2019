const Calculator = require('./calculator-Class');
const assert = require('chai').assert;

describe('Calculator class tests', () => {

    let calculator;
    beforeEach('get clean instance of class', () => {
        calculator = new Calculator();
    });

    describe('functions and property exist tests', () => {
        it('should has following functions', () => {
            assert.isTrue(Calculator.prototype.hasOwnProperty('constructor'));
            assert.isTrue(Calculator.prototype.hasOwnProperty('add'));
            assert.isTrue(Calculator.prototype.hasOwnProperty('divideNums'));
            assert.isTrue(Calculator.prototype.hasOwnProperty('toString'));
            assert.isTrue(Calculator.prototype.hasOwnProperty('orderBy'));
        });
        it('should has following property', () => {
            assert.isDefined(calculator.expenses);
        });
        it('should has following default value', () => {
            assert.deepEqual(calculator.expenses, []);
        });
    });

    describe('add function tests', () => {
        it('should add single number value', () => {
            calculator.add(9);
            assert.equal(JSON.stringify(calculator.expenses), '[9]');
        });
        it('should add multiple number values', () => {
            calculator.add(9);
            calculator.add(-5);
            calculator.add(1.5);
            assert.equal(JSON.stringify(calculator.expenses), '[9,-5,1.5]');
        });
        it('should add string values', () => {
            calculator.add('visual');
            calculator.add('studio');
            assert.equal(JSON.stringify(calculator.expenses), '["visual","studio"]');
        });
    });

    describe('divideNums function tests', () => {
        it('should throws an error for non numbers array', () => {
            calculator.add('visual');
            calculator.add('studio');
            const error = () => calculator.divideNums();
            assert.throws(error, 'There are no numbers in the array!');
        });
        it('should divide positive number values', () => {
            calculator.add(9);
            calculator.add('javascipt');
            calculator.add(3);
            assert.equal(calculator.divideNums(), 3);
        });
        it('should divide positive and negative number values', () => {
            calculator.add(9);
            calculator.add('javascipt');
            calculator.add(-3);
            assert.equal(calculator.divideNums(), -3);
        });
        it('should divide floting point number values', () => {
            calculator.add(3.3);
            calculator.add(2.2);
            assert.closeTo(calculator.divideNums(), 1.50, 0.01);
        });
        it('should return a string for zero number value', () => {
            calculator.add(5);
            calculator.add(0);
            assert.equal(calculator.divideNums(), 'Cannot divide by zero');
        });
    });

    describe('toString function tests', () => {
        it('should return a string with values', () => {
            calculator.add(9);
            calculator.add('javascipt');
            calculator.add(-3);
            assert.equal(calculator.toString(), '9 -> javascipt -> -3');
        });
        it('should return a string for empty array', () => {
            assert.equal(calculator.toString(), 'empty array');
        });
    });

    describe('orderBy function tests', () => {
        it('should sort number values', () => {
            calculator.add(8);
            calculator.add(-5);
            calculator.add(4.4);
            assert.equal(calculator.orderBy(), '-5, 4.4, 8');
        });
        it('should sort mixed values', () => {
            calculator.add(8);
            calculator.add('javascipt');
            calculator.add(-5);
            assert.equal(calculator.orderBy(), '-5, 8, javascipt');
        });
        it('should return a string for empty array', () => {
            assert.equal(calculator.orderBy(), 'empty');
        });
    });
});
