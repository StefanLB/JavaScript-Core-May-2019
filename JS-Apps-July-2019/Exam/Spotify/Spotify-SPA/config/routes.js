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

        this.get('#/song/create', songController.getCreateSong);
        this.post('#/song/create', songController.postCreateSong);

        this.get('#/song/all', songController.getAllSongs);
        this.get('#/song/my', songController.getMySongs);

        this.get('#/song/like/:songId', songController.likeSong);
        this.get('#/song/listen/:songId', songController.listenSong);
        this.get('#/song/remove/:songId', songController.removeSong);
    }).run('/');
});
