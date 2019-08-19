const HolidayPackage = require('./holiday-Package');
const assert = require('chai').assert;

describe('HolidayPackage class tests', () => {

    let holidayPackage;
    beforeEach('get clean instance of class', () => {
        holidayPackage = new HolidayPackage('Bulgaria', 'Summer');
    });

    describe('methods exists tests', () => {
        it('should has following methods', () => {
            assert.isTrue(HolidayPackage.prototype.hasOwnProperty('constructor'));
            assert.isTrue(HolidayPackage.prototype.hasOwnProperty('showVacationers'));
            assert.isNotFalse(HolidayPackage.prototype.hasOwnProperty('addVacationer'));
            assert.isNotFalse(HolidayPackage.prototype.hasOwnProperty('generateHolidayPackage'));
        });
        it('should be instantiated with two parameters', () => {
            assert.deepEqual(holidayPackage,
                { vacationers: [], destination: 'Bulgaria', season: 'Summer', _insuranceIncluded: false });
        });
    });

    describe('fileds exists tests', () => {
        it('should has following fields', () => {
            assert.isDefined(holidayPackage.vacationers);
            assert.isDefined(holidayPackage.destination);
            assert.isDefined(holidayPackage.season);
            assert.isDefined(holidayPackage.insuranceIncluded);
        });
        it('should has following default values', () => {
            assert.equal(JSON.stringify(holidayPackage.vacationers), JSON.stringify([]));
            assert.equal(holidayPackage.destination, 'Bulgaria');
            assert.equal(holidayPackage.season, 'Summer');
            assert.equal(holidayPackage.insuranceIncluded, false);
        });
    });

    describe('showVacationers method tests', () => {
        it('should return message for empty vacationers', () => {
            assert.equal(holidayPackage.showVacationers(), 'No vacationers are added yet');
        });
        it('should return existing vacationers', () => {
            holidayPackage.addVacationer('Radoslav Mihalev');
            holidayPackage.addVacationer('Paul Kalkbrenner');
            assert.equal(holidayPackage.showVacationers(), 'Vacationers:\nRadoslav Mihalev\nPaul Kalkbrenner');
        });
    });

    describe('addVacationer method tests', () => {
        it('should throw an error for non string name', () => {
            const error = () => holidayPackage.addVacationer({ a: 1 });
            assert.throws(error, 'Vacationer name must be a non-empty string');
        });
        it('should throw an error for single empty string name', () => {
            const error = () => holidayPackage.addVacationer(' ');
            assert.throws(error, 'Vacationer name must be a non-empty string');
        });
        it('should throw an error for single string name', () => {
            const error = () => holidayPackage.addVacationer('Radoslav');
            assert.throws(error, 'Name must consist of first name and last name');
        });
        it('should throw an error for empty string name', () => {
            const error = () => holidayPackage.addVacationer('');
            assert.throws(error, 'Name must consist of first name and last name');
        });

        it('should add a single vacationer', () => {
            holidayPackage.addVacationer('Radoslav Mihalev');
            assert.equal(holidayPackage.showVacationers(), 'Vacationers:\nRadoslav Mihalev');
        });
        it('should add a multiple vacationer', () => {
            holidayPackage.addVacationer('Radoslav Mihalev');
            holidayPackage.addVacationer('Joel Zimmerman');
            holidayPackage.addVacationer('Paul Kalkbrenner');
            assert.equal(holidayPackage.showVacationers(),
                'Vacationers:\nRadoslav Mihalev\nJoel Zimmerman\nPaul Kalkbrenner');
        });
    });

    describe('insuranceIncluded accessors tests', () => {
        it('should return default value', () => {
            assert.equal(holidayPackage._insuranceIncluded, false);
        });
        it('should change default value', () => {
            holidayPackage.insuranceIncluded = true;
            assert.equal(holidayPackage._insuranceIncluded, true);
        });
        it('should throw error for non boolean value', () => {
            const error = () => holidayPackage.insuranceIncluded = 'true';
            assert.throws(error, 'Insurance status must be a boolean');
        });
    });

    describe('generateHolidayPackage method tests', () => {
        it('should throw error for empty vacationers', () => {
            const error = () => holidayPackage.generateHolidayPackage();
            assert.throws(error, 'There must be at least 1 vacationer added');
        });
        it('should return message for single vacationer', () => {
            holidayPackage.addVacationer('Radoslav Mihalev');
            assert.equal(holidayPackage.generateHolidayPackage(),
                'Holiday Package Generated\nDestination: Bulgaria\nVacationers:\nRadoslav Mihalev\nPrice: 600');
        });
        it('should return message for single vacationer and insuranceIncluded value', () => {
            holidayPackage.addVacationer('Radoslav Mihalev');
            holidayPackage.insuranceIncluded = true;
            assert.equal(holidayPackage.generateHolidayPackage(),
                'Holiday Package Generated\nDestination: Bulgaria\nVacationers:\nRadoslav Mihalev\nPrice: 700');
        });
        it('should return message for single vacationer and out of season price', () => {
            holidayPackage = new HolidayPackage('England', 'Autumn');
            holidayPackage.addVacationer('Radoslav Mihalev');
            assert.equal(holidayPackage.generateHolidayPackage(),
                'Holiday Package Generated\nDestination: England\nVacationers:\nRadoslav Mihalev\nPrice: 400');
        });
    });
});
