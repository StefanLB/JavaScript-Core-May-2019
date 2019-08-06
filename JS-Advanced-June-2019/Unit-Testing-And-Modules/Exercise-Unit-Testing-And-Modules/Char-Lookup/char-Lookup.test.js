const lookupChar = require('./char-Lookup').lookupChar;
const assert = require('chai').assert;

describe('lookupChar function tests', () => {
    it('should return undefined for uncorrect params', () => {
        assert.isUndefined(lookupChar({ a: 5 }, 3));
    });
    it('should return undefined for uncorrect params', () => {
        assert.isUndefined(lookupChar('code', { a: 5 }));
    });
    it('should return undefined for uncorrect params', () => {
        assert.isUndefined(lookupChar('code', 2.4));
    });
    it('should return undefined for uncorrect params', () => {
        assert.equal(lookupChar('visual', -1), 'Incorrect index');
    });
    it('should return undefined for uncorrect params', () => {
        assert.equal(lookupChar('visual', 6), 'Incorrect index');
    });
    it('should return undefined for uncorrect params', () => {
        assert.equal(lookupChar('visual', 16), 'Incorrect index');
    });
    it('should return s for ("javascript", 4)', () => {
        assert.equal(lookupChar('javascript', 4), 's');
    });
    it('should return S for ("S", 0)', () => {
        assert.equal(lookupChar('S', 0), 'S');
    });
});
