$(function () {
    Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        this.get('#/user/register', userController.getRegister);
        this.post('#/user/register', userController.postRegister);

        this.get('#/user/login', userController.getLogin);
        this.post('#/user/login', userController.postLogin);

        this.get('#/user/logout', userController.logout);

        this.get('#/car/create', carController.getCreateCar);
        this.post('#/car/create', carController.postCreateCar);

        this.get('#/car/all', carController.getAllCars);
        this.get('#/car/my', carController.getMyCars);

        this.get('#/car/details/:carId', carController.getCarDetails);
        this.get('#/car/delete/:carId', carController.deleteCar);

        this.get('#/car/edit/:carId', carController.getEditCar);
        this.post('#/car/edit/:carId', carController.postEditCar);
    }).run('/');
});
