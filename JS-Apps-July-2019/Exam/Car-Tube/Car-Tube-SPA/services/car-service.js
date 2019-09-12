const carService = (function () {

    const createCar = function (car) {
        return requester.post('appdata', 'cars', 'Kinvey', car);
    };

    const getAllCars = function () {
        return requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}', 'Kinvey');
    };

    const getMyCars = function (userId) {
        return requester.get('appdata', `cars?query={"_acl.creator":"${userId}"}&sort={"_kmd.ect": -1}`, 'Kinvey');
    };

    const getCar = function (carId) {
        return requester.get('appdata', `cars/${carId}`, 'Kinvey');
    };

    const deleteCar = function (carId) {
        return requester.del('appdata', `cars/${carId}`, 'Kinvey');
    };

    const editCar = function (carId, car) {
        return requester.put('appdata', `cars/${carId}`, 'Kinvey', car)
    };

    return {
        createCar,
        getAllCars,
        getMyCars,
        getCar,
        deleteCar,
        editCar
    };
})();
