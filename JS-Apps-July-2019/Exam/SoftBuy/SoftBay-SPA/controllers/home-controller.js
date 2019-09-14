const homeController = (function () {

    const getHome = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.userId = userService.findUserId();
        
        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/home/home.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    return {
        getHome
    };
})();
