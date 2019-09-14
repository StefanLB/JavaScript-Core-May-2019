const movieController = (function () {

    const getAddMovie = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/movie/add-movie.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postAddMovie = function (ctx) {
        let { title, imageUrl, description, genres, tickets } = ctx.params;

        if (title.length < 6) {
            notifier.showError('The title should be at least 6 characters long.');
        } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            notifier.showError('The image should start with "http://" or "https://".');
        } else if (description.length < 10) {
            notifier.showError('The description should be at least 10 characters long.');
        } else if (!/^([A-Z][a-z ]+)+$/.test(genres)) {
            notifier.showError('The genres must be separated by a single space.');
        } else if (!tickets) {
            notifier.showError('The available tickets should be a number.');
        } else {
            genres = genres.split(' ').map((g) => g.trim());
            const data = { title, imageUrl, description, genres, tickets: Number(tickets) };

            movieService.createMovie(data)
                .then(function (res) {
                    notifier.showSuccess('Movie created successfully.');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getAllMovies = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        movieService.getAllMovies()
            .then(function (movies) {
                ctx.movies = movies.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/movie/all-movies.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getMyMovies = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const userId = userService.findUserId();

        movieService.getMyMovies(userId)
            .then(function (movies) {
                ctx.movies = movies.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/movie/my-movies.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const buyMovieTicket = function (ctx) {
        const movieId = ctx.params.movieId;

        movieService.getMovie(movieId)
            .then(function (movie) {

                if (movie.tickets === 0) {
                    return notifier.showError('There are no available tickets.');
                }

                movie.tickets--;
                movieService.editMovie(movieId, movie)
                    .then(function (res) {
                        notifier.showSuccess(`Successfully bought ticket for ${res.title}!`);
                        ctx.redirect('#/movie/all');
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getMovieDetails = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const movieId = ctx.params.movieId;

        movieService.getMovie(movieId)
            .then(function (movie) {
                ctx.movie = movie;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/movie/details-movie.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getEditMovie = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const movieId = ctx.params.movieId;

        movieService.getMovie(movieId)
            .then(function (movie) {
                ctx.movie = movie;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/movie/edit-movie.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postEditMovie = function (ctx) {
        let { title, imageUrl, description, genres, tickets } = ctx.params;

        if (title.length < 6) {
            notifier.showError('The title should be at least 6 characters long.');
        } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            notifier.showError('The image should start with "http://" or "https://".');
        } else if (description.length < 10) {
            notifier.showError('The description should be at least 10 characters long.');
        } else if (!/^([A-Z][a-z ]+)+$/.test(genres)) {
            notifier.showError('The genres must be separated by a single space.');
        } else if (!tickets) {
            notifier.showError('The available tickets should be a number.');
        } else {
            genres = genres.split(' ').map((g) => g.trim());
            const data = { title, imageUrl, description, genres, tickets: Number(tickets) };
            const movieId = ctx.params.movieId;

            movieService.editMovie(movieId, data)
                .then(function (res) {
                    notifier.showSuccess('Movie edited successfully.');
                    ctx.redirect('#/movie/all');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getDeleteMovie = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const movieId = ctx.params.movieId;

        movieService.getMovie(movieId)
            .then(function (movie) {
                ctx.movie = movie;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/movie/delete-movie.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postDeleteMovie = function (ctx) {
        const movieId = ctx.params.movieId;

        movieService.deleteMovie(movieId)
            .then(function (res) {
                notifier.showSuccess('Movie removed successfully!');
                ctx.redirect('#/home');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const searchMovie = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        movieService.getAllMovies()
            .then(function (movies) {
                const criteria = ctx.params.search;

                movies = movies.filter((movie) => {
                    return movie.genres.indexOf(criteria) > -1;
                });

                ctx.movies = movies.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/movie/all-movies.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getAddMovie,
        postAddMovie,
        getAllMovies,
        getMyMovies,
        buyMovieTicket,
        getMovieDetails,
        getEditMovie,
        postEditMovie,
        getDeleteMovie,
        postDeleteMovie,
        searchMovie
    };
})();
