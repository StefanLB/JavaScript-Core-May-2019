const sum = require('./sum-Of-Numbers').sum;
const assert = require('chai').assert;

describe('sum function tests', () => {
    it('should return 13 for [6, 7]', () => {
        assert.equal(sum([6, 7]), 13);
    });
    it('should return -12 for [-3, -4, -5]', () => {
        assert.equal(sum([-3, -4, -5]), -12);
    });
    it('should return 16 for ["4", "7", "5"]', () => {
        assert.equal(sum(["4", "7", "5"]), 16);
    });
    it('should return 9.5 for [4.5, 1.5, 3.5]', () => {
        assert.equal(sum([4.5, 1.5, 3.5]), 9.5);
    });
    it('should return 7 for [7]', () => {
        assert.equal(sum([7]), 7);
    });
});
