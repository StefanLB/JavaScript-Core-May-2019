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
        this.get('#/user/profile/:userId', userController.profile);

        this.get('#/offer/create', offerController.getCreateOffer);
        this.post('#/offer/create', offerController.postCreateOffer);

        this.get('#/offer/dashboard', offerController.getDashboard);

        this.get('#/offer/edit/:offerId', offerController.getEditOffer);
        this.post('#/offer/edit/:offerId', offerController.postEditOffer);

        this.get('#/offer/delete/:offerId', offerController.getDeleteOffer);
        this.post('#/offer/delete/:offerId', offerController.postDeleteOffer);

        this.get('#/offer/details/:offerId', offerController.detailsOffer);
        this.get('#/offer/buy/:offerId', offerController.buyOffer);
    }).run('/');
});
