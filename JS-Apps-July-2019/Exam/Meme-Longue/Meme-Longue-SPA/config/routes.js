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
        this.get('#/user/profile/:userId', userController.getProfile);
        this.get('#/user/delete/:userId', userController.deleteUser);

        this.get('#/meme/create', memeController.getCreateMeme);
        this.post('#/meme/create', memeController.postCreateMeme);

        this.get('#/meme/edit/:memeId', memeController.getEditMeme);
        this.post('#/meme/edit/:memeId', memeController.postEditMeme);

        this.get('#/meme/delete/:memeId', memeController.deleteMeme);
        this.get('#/meme/details/:memeId', memeController.getMemeDetails);
    }).run('/');
});
