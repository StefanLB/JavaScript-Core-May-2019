const homeController = (function () {

    const getHome = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.fullName = userService.findFullName();

        if (ctx.isAuthenticated) {
            recipeService.getAllRecipes()
                .then(function (recipes) {
                    ctx.recipes = recipes.slice(0);

                    ctx.loadPartials({
                        header: './views/common/header.hbs',
                        footer: './views/common/footer.hbs',
                        recipe: './views/recipe/recipe.hbs'
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
