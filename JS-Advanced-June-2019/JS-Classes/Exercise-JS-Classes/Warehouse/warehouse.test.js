const Warehouse = require('./warehouse');
const assert = require('chai').assert;

describe('Warehouse class test', () => {

    describe('addProduct tests', function () {

        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
        });

        it('should throw error if there is no place for product', function () {
            const error = () => warehouse.addProduct('Food', 'bread', 30);
            assert.throw(error, 'There is not enough space or the warehouse is already full');
        });

        it('should sum the quantity of product when added twice', function () {
            warehouse.addProduct('Food', 'cake', 5);
            warehouse.addProduct('Food', 'cake', 5);
            assert.deepEqual(JSON.stringify(warehouse.availableProducts.Food), '{"cake":10}');
        });
    });

    describe('orderProducts tests', function () {

        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
        });

        it('should return correct order', function () {
            warehouse.addProduct('Food', 'cake', 6);
            warehouse.addProduct('Food', 'pizza', 4);
            warehouse.addProduct('Food', 'cake', 6);
            warehouse.addProduct('Food', 'pizza', 4);
            warehouse.orderProducts('Food');
            assert.equal(JSON.stringify(warehouse.availableProducts.Food), '{"cake":12,"pizza":8}');
        });

        it('should return correct order', function () {
            warehouse.addProduct('Drink', 'water', 3);
            warehouse.addProduct('Drink', 'coke', 2);
            warehouse.addProduct('Drink', 'water', 3);
            warehouse.addProduct('Drink', 'coke', 2);
            warehouse.orderProducts('Drink');
            assert.equal(JSON.stringify(warehouse.availableProducts.Drink), '{"water":6,"coke":4}');
        });
    });

    describe('occupiedCapacity tests', function () {

        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
        });

        it('should return occupied space', function () {
            warehouse.addProduct('Food', 'pasta', 10);
            assert.equal(warehouse.occupiedCapacity(), 10);
        });
    });

    describe('revision tests', function () {

        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
        });

        it('should throw error if warehouse is empty', function () {
            assert.equal(warehouse.revision(), 'The warehouse is empty');
        });

        it('should return string with all available products', function () {
            warehouse.addProduct('Food', 'cake', 5);
            warehouse.addProduct('Food', 'pasta', 5);
            warehouse.addProduct('Food', 'cookies', 5);
            warehouse.addProduct('Drink', 'coke', 5);
            assert.equal(warehouse.revision(),
                'Product type - [Food]\n- cake 5\n- pasta 5\n- cookies 5\nProduct type - [Drink]\n- coke 5');
        });
    });

    describe('scrapeAProduct tests', function () {

        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
        });

        it('should throw error message when product does not exist', function () {
            assert.throw(() => warehouse.scrapeAProduct('Vodka', 10), 'Vodka do not exists');
        });

        it('should reduce quantity of product', function () {
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.scrapeAProduct('bread', 5);
            assert.equal(warehouse.availableProducts.Food['bread'], 5);
        });
    });

    describe('orderProducts tests', function () {
        it('should return correct order', function () {

            let warehouse = new Warehouse(20);

            warehouse.addProduct('Drink', 'water', 7);
            warehouse.addProduct('Drink', 'coke', 4);
            warehouse.orderProducts('Drink');
            assert.equal(JSON.stringify(warehouse.availableProducts.Drink), '{"water":7,"coke":4}');
        });
    });
});
