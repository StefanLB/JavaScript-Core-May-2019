const Sumator = require('./sumator-class');
const assert = require('chai').assert;

describe('Sumator class tests', () => {

    let sumator;
    beforeEach('get clean instance of class', () => {
        sumator = new Sumator();
    });

    describe('functions exist tests', () => {
        it('should has following functions', () => {
            assert.isTrue(Sumator.prototype.hasOwnProperty('constructor'));
            assert.isTrue(Sumator.prototype.hasOwnProperty('add'));
            assert.isTrue(Sumator.prototype.hasOwnProperty('sumNums'));
            assert.isTrue(Sumator.prototype.hasOwnProperty('removeByFilter'));
            assert.isTrue(Sumator.prototype.hasOwnProperty('toString'));
        });

        it('should be initialized', () => {
            assert.equal(JSON.stringify(sumator), '{"data":[]}');
        });
    });

    describe('property exists tests', () => {
        it('should has following property', () => {
            assert.isArray(sumator.data);
        });

        it('should be initialized as empty array', () => {
            assert.isEmpty(sumator.data);
        });
    });

    describe('add function tests', () => {
        it('should add single number', () => {
            sumator.add(9);
            assert.equal(JSON.stringify(sumator.data), '[9]');
        });

        it('should add multiple numbers', () => {
            sumator.add(2);
            sumator.add(5.5);
            sumator.add(6);
            assert.equal(JSON.stringify(sumator.data), '[2,5.5,6]');
        });

        it('should add non number values', () => {
            sumator.add('one');
            sumator.add('5.5');
            sumator.add([6]);
            assert.equal(JSON.stringify(sumator.data), '["one","5.5",[6]]');
        });
    });

    describe('sumNums function tests', () => {
        it('should return sum of number values', () => {
            sumator.add(2);
            sumator.add(5.5);
            sumator.add(6);
            assert.equal(sumator.sumNums(), 13.5);
        });

        it('should return sum of number values', () => {
            sumator.add(1.1);
            sumator.add(2.2);
            assert.closeTo(sumator.sumNums(), 3.3, 0.01);
        });

        it('should return sum of number values', () => {
            sumator.add(1);
            sumator.add('two');
            sumator.add(3);
            sumator.add('4');
            assert.equal(sumator.sumNums(), 4);
        });

        it('should return 0 for empty array', () => {
            assert.equal(sumator.sumNums(), 0);
        });
    });

    describe('removeByFilter function tests', () => {
        it('should remove even numbers', () => {
            sumator.add(4);
            sumator.add('javascript');
            sumator.add(6);
            sumator.add(2019);
            sumator.removeByFilter(x => x % 2 === 0);
            assert.equal(JSON.stringify(sumator.data), '["javascript",2019]');
        });

        it('should remove odd numbers', () => {
            sumator.add(4);
            sumator.add('javascript');
            sumator.add(6);
            sumator.add(2019);
            sumator.removeByFilter(x => x % 2 !== 0);
            assert.equal(JSON.stringify(sumator.data), '[4,6]');
        });
    });

    describe('toString function tests', () => {
        it('should return empty for empty list', () => {
            assert.equal(sumator.toString(), '(empty)');
        });

        it('should return string for numbers values', () => {
            sumator.add(2);
            sumator.add(5.5);
            sumator.add(6);
            assert.equal(sumator.toString(), '2, 5.5, 6');
        });

        it('should return string for mixed values', () => {
            sumator.add(5.5);
            sumator.add('javascript');
            sumator.add(6);
            sumator.add('2019');
            assert.equal(sumator.toString(), '5.5, javascript, 6, 2019');
        });
    });
});
