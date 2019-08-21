const BookStore = require('./book-Store');
const assert = require('chai').assert;

describe('BookStore class tests', () => {

    let bookStore;
    beforeEach('get clean instance of class', () => {
        bookStore = new BookStore('Store');
    });

    describe('function exist tests', () => {
        it('should has following functions', () => {
            assert.isTrue(BookStore.prototype.hasOwnProperty('constructor'));
            assert.isTrue(BookStore.prototype.hasOwnProperty('stockBooks'));
            assert.isTrue(BookStore.prototype.hasOwnProperty('hire'));
            assert.isTrue(BookStore.prototype.hasOwnProperty('fire'));
            assert.isTrue(BookStore.prototype.hasOwnProperty('sellBook'));
            assert.isTrue(BookStore.prototype.hasOwnProperty('printWorkers'));
        });
    });

    describe('properties exist tests', () => {
        it('should has following properties', () => {
            assert.equal(bookStore.name, 'Store');
            assert.equal(JSON.stringify(bookStore.books), '[]');
            assert.equal(JSON.stringify(bookStore._workers), '[]');
            assert.equal(JSON.stringify(bookStore.workers), '[]');
        });
    });

    describe('stockBooks funtion tests', () => {
        it('should store multiple books', () => {
            assert.equal(JSON.stringify(bookStore.stockBooks(['Inferno-Dan Braun', 'Harry Potter-J.Rowling', 'Uncle Toms Cabin-Hariet Stow', 'The Jungle-Upton Sinclear'])),
                '[{"title":"Inferno","author":"Dan Braun"},{"title":"Harry Potter","author":"J.Rowling"},{"title":"Uncle Toms Cabin","author":"Hariet Stow"},{"title":"The Jungle","author":"Upton Sinclear"}]');
            assert.equal(JSON.stringify(bookStore.books),
                '[{"title":"Inferno","author":"Dan Braun"},{"title":"Harry Potter","author":"J.Rowling"},{"title":"Uncle Toms Cabin","author":"Hariet Stow"},{"title":"The Jungle","author":"Upton Sinclear"}]');
        });

        it('should store single book', () => {
            assert.equal(JSON.stringify(bookStore.stockBooks(['Inferno-Dan Braun'])), '[{"title":"Inferno","author":"Dan Braun"}]');
            assert.equal(JSON.stringify(bookStore.books), '[{"title":"Inferno","author":"Dan Braun"}]');
        });
    });

    describe('hire function tests', () => {
        it('should hire single person', () => {
            assert.equal(bookStore.hire('George', 'seller'), 'George started work at Store as seller');
            assert.equal(JSON.stringify(bookStore.workers), '[{"name":"George","position":"seller","booksSold":0}]');
        });

        it('should hire multiple people', () => {
            assert.equal(bookStore.hire('George', 'seller'), 'George started work at Store as seller');
            assert.equal(bookStore.hire('Ina', 'seller'), 'Ina started work at Store as seller');
            assert.equal(bookStore.hire('Tom', 'juniorSeller'), 'Tom started work at Store as juniorSeller');
            assert.equal(JSON.stringify(bookStore.workers),
                '[{"name":"George","position":"seller","booksSold":0},{"name":"Ina","position":"seller","booksSold":0},{"name":"Tom","position":"juniorSeller","booksSold":0}]');
        });

        it('should throw an error for hired person', () => {
            bookStore.hire('George', 'seller');
            const err = () => bookStore.hire('George', 'seller');
            assert.throws(err, 'This person is our employee');
        });
    });

    describe('fire function tests', () => {
        it('should fire single person', () => {
            bookStore.hire('Ina', 'seller');
            bookStore.hire('Tom', 'juniorSeller');
            assert.equal(bookStore.fire('Ina'), 'Ina is fired');
            assert.equal(JSON.stringify(bookStore.workers), '[{"name":"Tom","position":"juniorSeller","booksSold":0}]');
        });

        it('should throw an error for not existing person', () => {
            bookStore.hire('Ina', 'seller');
            bookStore.hire('Tom', 'juniorSeller');
            const err = () => bookStore.fire('Radoslav');
            assert.throws(err, 'Radoslav doesn\'t work here');
        })
    });

    describe('sellBook funtion tests', () => {
        it('should throw an error for not existing book', () => {
            bookStore.hire('Ina', 'seller');
            const err = () => bookStore.sellBook('Angels and Deamons', 'Ina');
            assert.throws(err, 'This book is out of stock');
        });

        it('should throw an error for not existing person', () => {
            bookStore.stockBooks(['Inferno-Dan Braun']);
            const err = () => bookStore.sellBook('Inferno', 'Radoslav');
            assert.throws(err, 'Radoslav is not working here');
        });

        it('should sell a book', () => {
            bookStore.stockBooks(['Inferno-Dan Braun', 'Harry Potter-J.Rowling', 'Uncle Toms Cabin-Hariet Stow', 'The Jungle-Upton Sinclear']);
            bookStore.hire('George', 'seller');
            bookStore.sellBook('Inferno', 'George')
            assert.equal(JSON.stringify(bookStore.books),
                '[{"title":"Harry Potter","author":"J.Rowling"},{"title":"Uncle Toms Cabin","author":"Hariet Stow"},{"title":"The Jungle","author":"Upton Sinclear"}]');
            assert.equal(JSON.stringify(bookStore.workers),
                '[{"name":"George","position":"seller","booksSold":1}]');
        });
    });

    describe('printWorkers function tests', () => {
        it('should print single person', () => {
            bookStore.hire('George', 'seller');
            assert.equal(bookStore.printWorkers(), 'Name:George Position:seller BooksSold:0');
        });

        it('should print multiple people', () => {
            bookStore.hire('Ina', 'seller');
            bookStore.hire('Tom', 'juniorSeller');
            assert.equal(bookStore.printWorkers(),
                'Name:Ina Position:seller BooksSold:0\nName:Tom Position:juniorSeller BooksSold:0');
        });

        it('should print undefined for not existing people', () => {
            assert.equal(bookStore.printWorkers(), '');
        });
    });
});
