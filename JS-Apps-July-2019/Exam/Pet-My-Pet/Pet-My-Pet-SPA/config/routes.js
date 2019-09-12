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

        this.get('#/pet/create', petController.getCreate);
        this.post('#/pet/create', petController.postCreate);

        this.get('#/pet/my', petController.getMyPets);
        this.get('#/pet/:category', petController.getAllPets);

        this.get('#/pet/delete/:petId', petController.getDeletePet);
        this.post('#/pet/delete/:petId', petController.postDeletePet);

        this.get('#/pet/edit/:petId', petController.getEditPet);
        this.post('#/pet/edit/:petId', petController.postEditPet);

        this.get('#/pet/details/:petId', petController.getPetDetails);
        this.get('#/pet/like/:petId', petController.getLikePet);
    }).run('/');
});
