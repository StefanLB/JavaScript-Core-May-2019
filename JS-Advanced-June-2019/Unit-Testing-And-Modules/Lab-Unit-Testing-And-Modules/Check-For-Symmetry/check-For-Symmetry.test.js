const isSymmetric = require('./check-For-Symmetry').isSymmetric;
const assert = require('chai').assert;

describe('isSymmetric function tests', () => {
    describe('tests which return false', () => {
        it('should not work with wrong params', () => {
            assert.isFalse(isSymmetric('master'));
        });
        it('should not work with wrong params', () => {
            assert.isNotTrue(isSymmetric({ a: 5 }));
        });
        it('should not work with wrong params', () => {
            assert.isFalse(isSymmetric([1, 2, 3, 4, 5]));
        });
        it('should not work with wrong params', () => {
            assert.isNotTrue(isSymmetric([1, 2]));
        });
    });
    describe('tests witch return true', () => {
        it('should work with correct params', () => {
            assert.isTrue(isSymmetric([1]));
        });
        it('should work with correct params', () => {
            assert.isNotFalse(isSymmetric([1, 2, 3, 4, 3, 2, 1]));
        });
        it('should work with correct params', () => {
            assert.isTrue(isSymmetric([{ a: 1 }, ['a', '1'], ['a', '1'], { a: 1 }]));
        });
        it('should work with correct params', () => {
            assert.isNotFalse(isSymmetric(['visual', '6', '6', 'visual']));
        });
    });
});
