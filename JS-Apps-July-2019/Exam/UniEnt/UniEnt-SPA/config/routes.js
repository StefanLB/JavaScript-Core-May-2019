$(function () {
    Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        this.get('#/user/register', userController.getRegister);
        this.post('#/user/register', userController.postRegister);

        this.get('#/user/login', userController.getLogin);
        this.post('#/user/login', userController.postLogin);

        this.get('#/user/logout', userController.logout);
        this.get('#/user/profile', userController.getProfile);

        this.get('#/event/create', eventController.getCreateEvent);
        this.post('#/event/create', eventController.postCreateEvent);

        this.get('#/event/details/:eventId', eventController.getEventDetails);

        this.get('#/event/edit/:eventId', eventController.getEditEvent);
        this.post('#/event/edit/:eventId', eventController.postEditEvent);

        this.get('#/event/join/:eventId', eventController.joinEvent);
        this.get('#/event/delete/:eventId', eventController.deleteEvent);
    }).run('/');
});
