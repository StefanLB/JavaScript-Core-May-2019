const homeController = (function () {

    const getHome = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        if (ctx.isAuthenticated) {
            eventService.getAllEvents()
                .then(function (events) {
                    ctx.events = events;

                    ctx.loadPartials({
                        header: './views/common/header.hbs',
                        footer: './views/common/footer.hbs'
                    }).then(function (res) {
                        this.partial('./views/home/home.hbs');
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
                this.partial('./views/home/home.hbs');
            }).catch(function (err) {
                notifier.handleError(err);
            });
        }
    };

    return {
        getHome
    };
})();
