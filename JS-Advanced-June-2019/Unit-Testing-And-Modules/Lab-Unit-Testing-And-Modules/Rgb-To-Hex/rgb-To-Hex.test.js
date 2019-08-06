const rgbToHexColor = require('./rgb-To-Hex').rgbToHexColor;
const assert = require('chai').assert;

describe('rgbToHexColor function tests', function () {
    it('should return undefined for -100, 255, 255', function () {
        const asserted = rgbToHexColor(-100, 255, 255);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 255, -100, 255', function () {
        const asserted = rgbToHexColor(255, -100, 255);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 255, 255, -100', function () {
        const asserted = rgbToHexColor(255, 255, -100);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 304, 0, 0', function () {
        const asserted = rgbToHexColor(304, 0, 0);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 0, 304, 0', function () {
        const asserted = rgbToHexColor(0, 304, 0);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 0, 0, 304', function () {
        const asserted = rgbToHexColor(0, 0, 304);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 45.45, 255, 0', function () {
        const asserted = rgbToHexColor(45.45, 255, 0);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 255, 45.45, 0', function () {
        const asserted = rgbToHexColor(255, 45.45, 0);
        assert.isUndefined(asserted);
    });
    it('should return undefined for 255, 0, 45.45', function () {
        const asserted = rgbToHexColor(255, 0, 45.45);
        assert.isUndefined(asserted);
    });
    it('should return #000000 for 0, 0, 0', function () {
        const asserted = rgbToHexColor(0, 0, 0);
        assert.equal(asserted, '#000000');
    });
    it('should return #FFFFFF for 255, 255, 255', function () {
        const asserted = rgbToHexColor(255, 255, 255);
        assert.equal(asserted, '#FFFFFF');
    });
});
