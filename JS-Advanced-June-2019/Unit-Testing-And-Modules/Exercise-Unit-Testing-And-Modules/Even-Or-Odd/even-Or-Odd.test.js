const isOddOrEven = require('./even-Or-Odd').isOddOrEven;
const assert = require('chai').assert;

describe('isOddOrEven function tests', () => {
    it('should return undefined for { a: 5 }', () => {
        assert.isUndefined(isOddOrEven({ a: 5 }));
    });
    it('should return undefined for 13', () => {
        assert.isUndefined(isOddOrEven(13));
    });
    it('should return even for even length string', () => {
        assert.equal(isOddOrEven('visualstudiocode'), 'even');
    });
    it('should return odd for odd legth string', () => {
        assert.equal(isOddOrEven('microsoft'), 'odd');
    });
    it('should work with multiple strings', () => {
        assert.equal(isOddOrEven('javascript'), 'even');
        assert.equal(isOddOrEven('softuni'), 'odd');
        assert.equal(isOddOrEven('judge'), 'odd');
    });
});
