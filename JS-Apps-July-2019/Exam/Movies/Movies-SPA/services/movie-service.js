const movieService = (function () {

    const getMyMovies = function (userId) {
        return requester.get('appdata', `movies?query={"_acl.creator":"${userId}"}`, 'Kinvey');
    };

    const createMovie = function (data) {
        return requester.post('appdata', 'movies', 'Kinvey', data);
    };

    const getAllMovies = function () {
        return requester.get('appdata', `movies?query={}&sort={"tickets": -1}`, 'Kinvey');
    };

    const getMovie = function (movieId) {
        return requester.get('appdata', `movies/${movieId}`, 'Kinvey');
    };

    const editMovie = function (movieId, movie) {
        return requester.put('appdata', `movies/${movieId}`, 'Kinvey', movie);
    };

    const deleteMovie = function (movieId) {
        return requester.del('appdata', `movies/${movieId}`, 'Kinvey');
    };

    return {
        getMyMovies,
        createMovie,
        getAllMovies,
        getMovie,
        editMovie,
        deleteMovie
    };
})();
