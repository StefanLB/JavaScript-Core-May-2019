const carController = (function () {

    const getCreateCar = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/car/create-car.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreateCar = function (ctx) {
        const { title, description, brand, model, year, imageUrl, fuelType, price } = ctx.params;

        if (title.length < 3 || title.length > 33) {
            notifier.showError('The title length must be between 3 and 33 characters!');
        } else if (description.length < 30 || description.length > 450) {
            notifier.showError('The description length must be between 30 and 450 characters!');
        } else if (brand.length > 11) {
            notifier.showError('The brand length must not exceed 11 characters!');
        } else if (model.length < 4 || model.length > 11) {
            notifier.showError('The model length must be between 4 and 11 characters!');
        } else if (fuelType.length > 11) {
            notifier.showError('The fuelType length must not exceed 11 characters!');
        } else if (year.length !== 4) {
            notifier.showError('The year must be only 4 characters long!');
        } else if (price > 1000000) {
            notifier.showError('The maximum price is 1000000$.');
        } else if (!imageUrl.startsWith('http')) {
            notifier.showError('Link url should always start with "http".');
        } else {
            const seller = userService.findUsername();
            const car = { title, description, imageUrl, brand, model, fuelType, year: Number(year), price: Number(price), seller };

            carService.createCar(car)
                .then((res) => {
                    notifier.showSuccess('Car listing created.');
                    ctx.redirect('#/car/all');
                })
                .catch((err) => {
                    notifier.handleError(err);
                });
        }
    };

    const getAllCars = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        carService.getAllCars()
            .then((cars) => {
                const userId = userService.findUserId();

                cars.forEach((car) => {
                    car.isCreator = car._acl.creator === userId;
                });

                ctx.cars = cars.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/car/all-cars.hbs');
                });
            })
            .catch((err) => {
                notifier.handleError(err);
            });
    };

    const getMyCars = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const userId = userService.findUserId();

        carService.getMyCars(userId)
            .then((cars) => {
                ctx.cars = cars.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/car/my-cars.hbs');
                });
            })
            .catch((err) => {
                notifier.handleError(err);
            });
    };

    const getCarDetails = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const carId = ctx.params.carId;

        carService.getCar(carId)
            .then((car) => {
                const userId = userService.findUserId();
                car.isCreator = car._acl.creator === userId;
                ctx.car = car;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/car/details-car.hbs');
                });
            })
            .catch((err) => {
                notifier.handleError(err);
            });
    };

    const deleteCar = function (ctx) {
        const carId = ctx.params.carId;

        carService.deleteCar(carId)
            .then((res) => {
                notifier.showSuccess('Car listing deleted.');
                ctx.redirect('#/car/all');
            })
            .catch((err) => {
                notifier.handleError(err);
            });
    };

    const getEditCar = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const carId = ctx.params.carId;

        carService.getCar(carId)
            .then((car) => {
                ctx.car = car;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/car/edit-car.hbs');
                }).catch(function (err) {
                    notifier.handleError(err);
                });
            })
            .catch((err) => {
                notifier.handleError(err);
            });
    };

    const postEditCar = function (ctx) {
        const { title, description, brand, model, year, imageUrl, fuelType, price, seller } = ctx.params;

        if (title.length < 3 || title.length > 33) {
            notifier.showError('The title length must be between 3 and 33 characters!');
        } else if (description.length < 30 || description.length > 450) {
            notifier.showError('The description length must be between 30 and 450 characters!');
        } else if (brand.length > 11) {
            notifier.showError('The brand length must not exceed 11 characters!');
        } else if (model.length < 4 || model.length > 11) {
            notifier.showError('The model length must be between 4 and 11 characters!');
        } else if (fuelType.length > 11) {
            notifier.showError('The fuelType length must not exceed 11 characters!');
        } else if (year.length !== 4) {
            notifier.showError('The year must be only 4 characters long!');
        } else if (price > 1000000) {
            notifier.showError('The maximum price is 1000000$.');
        } else if (!imageUrl.startsWith('http')) {
            notifier.showError('Link url should always start with "http".');
        } else {
            const carId = ctx.params.carId;
            const car = { title, description, imageUrl, brand, model, fuelType, year: Number(year), price: Number(price), seller };

            carService.editCar(carId, car)
                .then((res) => {
                    notifier.showSuccess(`Listing ${title} updated.`);
                    ctx.redirect('#/car/all');
                })
                .catch((err) => {
                    notifier.handleError(err);
                });
        }
    };

    return {
        getCreateCar,
        postCreateCar,
        getAllCars,
        getMyCars,
        getCarDetails,
        deleteCar,
        getEditCar,
        postEditCar
    };
})();
