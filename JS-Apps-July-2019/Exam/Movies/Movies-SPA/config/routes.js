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

        this.get('#/movie/create', movieController.getAddMovie);
        this.post('#/movie/create', movieController.postAddMovie);

        this.get('#/movie/all', movieController.getAllMovies);
        this.get('#/movie/my', movieController.getMyMovies);

        this.get('#/movie/ticket/:movieId', movieController.buyMovieTicket);
        this.get('#/movie/details/:movieId', movieController.getMovieDetails);

        this.get('#/movie/edit/:movieId', movieController.getEditMovie);
        this.post('#/movie/edit/:movieId', movieController.postEditMovie);

        this.get('#/movie/delete/:movieId', movieController.getDeleteMovie);
        this.post('#/movie/delete/:movieId', movieController.postDeleteMovie);

        this.get('#/movie/search', movieController.searchMovie);
    }).run('/');
});
