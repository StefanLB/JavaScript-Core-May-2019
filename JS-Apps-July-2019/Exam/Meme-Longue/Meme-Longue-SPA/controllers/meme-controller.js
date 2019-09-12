const memeController = (function () {

    const getCreateMeme = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        ctx._id = userService.findUserId();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('../views/meme/create-meme.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreateMeme = function (ctx) {
        const { title, description, imageUrl } = ctx.params;

        if (title.length < 3 || title.length > 33) {
            notifier.showError('The title length must be between 3 and 33 characters!');
        } else if (description.length < 30 || description.length > 450) {
            notifier.showError('The description length must be between 30 and 450 characters!');
        } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            notifier.showError('The imageUrl should start with "http://" or "https://".');
        } else {
            const creator = userService.findUsername();
            const meme = { title, description, imageUrl, creator };

            memeService.createMeme(meme)
                .then(function (res) {
                    notifier.showSuccess('Meme created.');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getEditMeme = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        ctx._id = userService.findUserId();
        const memeId = ctx.params.memeId;

        memeService.getMeme(memeId)
            .then(function (meme) {
                ctx.meme = meme;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('../views/meme/edit-meme.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postEditMeme = function (ctx) {
        const { title, description, imageUrl, creator } = ctx.params;

        if (title.length < 3 || title.length > 33) {
            notifier.showError('The title length must be between 3 and 33 characters!');
        } else if (description.length < 30 || description.length > 450) {
            notifier.showError('The description length must be between 30 and 450 characters!');
        } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            notifier.showError('The imageUrl should start with "http://" or "https://".');
        } else {
            const memeId = ctx.params.memeId;
            const meme = { title, description, imageUrl, creator };

            memeService.editMeme(memeId, meme)
                .then(function (res) {
                    notifier.showSuccess(`Meme ${title} updated.`);
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const deleteMeme = function (ctx) {
        const memeId = ctx.params.memeId;

        memeService.deleteMeme(memeId)
            .then(function (res) {
                notifier.showSuccess('Meme deleted.');
                ctx.redirect('#/home');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getMemeDetails = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        ctx._id = userService.findUserId();
        const memeId = ctx.params.memeId;

        memeService.getMeme(memeId)
            .then(function (meme) {
                const userId = userService.findUserId();

                meme.isCreator = meme._acl.creator === userId;
                ctx.meme = meme;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('../views/meme/details-meme.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getCreateMeme,
        postCreateMeme,
        getEditMeme,
        postEditMeme,
        deleteMeme,
        getMemeDetails
    };
})();
