const songController = (function () {

    const getCreateSong = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/song/create-song.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreateSong = function (ctx) {
        const { title, artist, imageURL } = ctx.params;

        if (title.length < 6) {
            notifier.showError('The title should be at least 6 characters long.');
        } else if (artist.length < 3) {
            notifier.showError('The artist should be at least 3 characters long.');
        } else if (!imageURL.startsWith('http://') && !imageURL.startsWith('https://')) {
            notifier.showError('The image should start with "http://" or "https://".');
        } else {
            const song = { title, artist, imageURL, likes: 0, listened: 0 };

            songService.createSong(song)
                .then(function (res) {
                    notifier.showSuccess('Song created successfully.');
                    ctx.redirect('#/song/all');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getAllSongs = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        songService.getAllSongs()
            .then(function (songs) {
                const userId = userService.findUserId();

                songs.forEach((song) => {
                    song.isCreator = song._acl.creator === userId;
                });

                songs.sort((a, b) => {
                    return a.isCreator - b.isCreator || b.likes - a.likes || b.listened - a.listened;
                });

                ctx.songs = songs.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs',
                    song: './views/song/song.hbs'
                }).then(function (res) {
                    this.partial('./views/song/all-songs.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getMySongs = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const userId = userService.findUserId();

        songService.getMySongs(userId)
            .then(function (songs) {

                songs.forEach((song) => {
                    song.isCreator = song._acl.creator === userId;
                });

                songs.sort((a, b) => {
                    return b.likes - a.likes || b.listened - a.listened;
                });

                ctx.songs = songs.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs',
                    song: './views/song/song.hbs'
                }).then(function (res) {
                    this.partial('./views/song/my-songs.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const likeSong = function (ctx) {
        const songId = ctx.params.songId;

        songService.getSong(songId)
            .then(function (song) {
                song.likes++;

                songService.likeSong(songId, song)
                    .then(function (res) {
                        notifier.showSuccess('Liked!');
                        ctx.redirect('#/song/all');
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const listenSong = function (ctx) {
        const songId = ctx.params.songId;

        songService.getSong(songId)
            .then(function (song) {
                song.listened++;

                songService.listenSong(songId, song)
                    .then(function (res) {
                        notifier.showSuccess(`You just listened ${res.title}.`);
                        ctx.redirect('#/song/all');
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const removeSong = function (ctx) {
        const songId = ctx.params.songId;

        songService.removeSong(songId)
            .then(function (res) {
                notifier.showSuccess('Song removed successfully!');
                ctx.redirect('#/song/all');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getCreateSong,
        postCreateSong,
        getAllSongs,
        getMySongs,
        likeSong,
        listenSong,
        removeSong
    }
})();
