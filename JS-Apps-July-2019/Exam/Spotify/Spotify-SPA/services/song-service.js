const songService = (function () {

    const getMySongs = function (userId) {
        return requester.get('appdata', `songs?query={"_acl.creator":"${userId}"}`, 'Kinvey');
    };

    const createSong = function (song) {
        return requester.post('appdata', 'songs', 'Kinvey', song);
    };

    const getAllSongs = function () {
        return requester.get('appdata', 'songs', 'Kinvey');
    };

    const getSong = function (songId) {
        return requester.get('appdata', `songs/${songId}`, 'Kinvey');
    };

    const likeSong = function (songId, song) {
        return requester.put('appdata', `songs/${songId}`, 'Kinvey', song);
    };

    const listenSong = function (songId, song) {
        return requester.put('appdata', `songs/${songId}`, 'Kinvey', song);
    };

    const removeSong = function (songId) {
        return requester.del('appdata', `songs/${songId}`, 'Kinvey');
    };

    return {
        getMySongs,
        createSong,
        getAllSongs,
        getSong,
        likeSong,
        listenSong,
        removeSong
    };
})();
