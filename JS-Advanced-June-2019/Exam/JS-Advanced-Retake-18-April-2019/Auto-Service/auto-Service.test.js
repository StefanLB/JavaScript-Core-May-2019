const AutoService = require('./auto-Service');
const assert = require('chai').assert;

describe('AutoService class tests', () => {

    let autoService;
    beforeEach('get clean instance of class', () => {
        autoService = new AutoService(2);
    });

    describe('constructor method tests', () => {
        it('should has property garageCapacity', () => {
            assert.deepEqual(autoService, { garageCapacity: 2, workInProgress: [], backlogWork: [] });
        });
        it('should has property workInProgress', () => {
            assert.isArray(autoService.workInProgress);
        });
        it('should be initialized as an empty array', () => {
            assert.isEmpty(autoService.workInProgress);
        });
        it('should has property backlogWork', () => {
            assert.isArray(autoService.backlogWork);
        });
        it('should be initialized as an empty array', () => {
            assert.isEmpty(autoService.backlogWork);
        });
    });

    describe('accessor availableSpace tests', () => {
        it('should has accessor availableSpace', () => {
            assert.isDefined(autoService.availableSpace);
        });
        it('should return correct space', () => {
            assert.equal(autoService.availableSpace, 2);
        });
        it('should return correct space', () => {
            let clientName = 'Mihalev';
            let plateNumber = 'CH1234CH';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };

            autoService.signUpForReview(clientName, plateNumber, carInfo);
            assert.equal(autoService.availableSpace, 1);
        });
    });

    describe('signUpForReview method tests', () => {
        it('should add client to workInProgress', () => {
            let clientName = 'Mihalev';
            let plateNumber = 'CH1234CH';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            let result = autoService.workInProgress[0];
            assert.deepEqual(result,
                { plateNumber: 'CH1234CH', clientName: 'Mihalev', carInfo: { engine: 'MFRGG23', transmission: 'FF4418ZZ', doors: 'broken' } });
        });
        it('should add client to backlogWork', () => {
            let clientName = 'Mihalev';
            let plateNumber = 'CH1234CH';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            clientName = 'Nakov';
            plateNumber = 'CA4321CA';
            carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            clientName = 'Plovdiv';
            plateNumber = 'PB4321PB';
            carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            let result = autoService.backlogWork[0];
            assert.deepEqual(result,
                { plateNumber: 'PB4321PB', clientName: 'Plovdiv', carInfo: { engine: 'MFRGG23', transmission: 'FF4418ZZ', exaustPipe: 'REMUS' } });
        });
    });

    describe('carInfo method tests', () => {
        it('should return carInfo from backlog', () => {
            let clientName = 'Mihalev';
            let plateNumber = 'CH1234CH';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            clientName = 'Varna';
            plateNumber = 'CA4321CA';
            carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            clientName = 'Plovdiv';
            plateNumber = 'PB4321PB';
            carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            let result = autoService.carInfo('PB4321PB', 'Plovdiv');
            assert.deepEqual(result,
                { plateNumber: 'PB4321PB', clientName: 'Plovdiv', carInfo: { engine: 'MFRGG23', transmission: 'FF4418ZZ', exaustPipe: 'REMUS' } });
        });
        it('should return info when clientName and plateNumber exist', () => {
            let clientName = 'Mihalev';
            let plateNumber = 'CH1234CH';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            let result = autoService.carInfo(plateNumber, clientName);
            assert.deepEqual(result,
                { plateNumber: 'CH1234CH', clientName: 'Mihalev', carInfo: { engine: 'MFRGG23', transmission: 'FF4418ZZ', doors: 'broken' } });
        });
    });

    describe('repairCar method tests', () => {
        it('should return message when there are no cars', () => {
            assert.equal(autoService.repairCar(), 'No clients, we are just chilling...');
        });
        it('should return no broken parts when car is ok', () => {
            let clientName = 'Plovdiv';
            let plateNumber = 'PB4321PB';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            assert.equal(autoService.repairCar(), 'Your car was fine, nothing was repaired.');
        });
        it('should repear single part', () => {
            let clientName = 'Mihalev';
            let plateNumber = 'CH1234CH';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);
            assert.equal(autoService.repairCar(), 'Your doors were repaired.');
        });
        it('should repear multiple parts', () => {
            let clientName = 'Nakov';
            let plateNumber = 'CA4321CA';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);

            assert.equal(autoService.repairCar(), 'Your doors and wheels and tires were repaired.');
        });
    });
});
