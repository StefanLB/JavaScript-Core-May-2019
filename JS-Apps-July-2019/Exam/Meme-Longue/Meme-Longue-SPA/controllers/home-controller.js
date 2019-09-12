const homeController = (function () {

    const getHome = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        ctx._id = userService.findUserId();

        if (ctx.isAuthenticated) {
            memeService.getAllMemes()
                .then(function (memes) {
                    const userId = userService.findUserId();

                    memes.forEach((meme) => {
                        meme.isCreator = meme._acl.creator === userId;
                    });

                    ctx.memes = memes.slice(0);

                    ctx.loadPartials({
                        header: './views/common/header.hbs',
                        footer: './views/common/footer.hbs'
                    }).then(function (res) {
                        this.partial('.././views/home/home.hbs');
                    });
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        } else if (!ctx.isAuthenticated) {
            ctx.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs'
            }).then(function (res) {
                this.partial('.././views/home/home.hbs');
            }).catch(function (err) {
                notifier.handleError(err);
            });
        }
    };

    return {
        getHome
    };
})();
