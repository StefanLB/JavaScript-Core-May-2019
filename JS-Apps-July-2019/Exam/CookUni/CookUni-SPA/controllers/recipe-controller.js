const recipeController = (function () {

    const getCreateRecipe = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.fullName = userService.findFullName();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/recipe/create-recipe.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreateRecipe = function (ctx) {
        let { meal, ingredients, prepMethod, description, foodImageURL, category } = ctx.params;
        ingredients = ingredients.split(',').map((i) => i.trim()).filter((i) => i !== '');

        if (meal.length < 4) {
            notifier.showError('The meal should be at least 4 characters long.');
        } else if (ingredients.length < 2) {
            notifier.showError('The ingredients should be at least 2 and separated by comma.');
        } else if (prepMethod.length < 10 || description.length < 10) {
            notifier.showError('The preparation method and description should be at least 10 characters long each.');
        } else if (!foodImageURL.startsWith('http://') && !foodImageURL.startsWith('https://')) {
            notifier.showError('The foodImageURL should start with "http://" or "https://".');
        } else if (!category) {
            notifier.showError('A single category should be selected.');
        } else {
            const categoryImageURL = categories[category];
            const data = { meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL, likes: 0 };

            recipeService.createRecipe(data)
                .then(function (res) {
                    notifier.showSuccess('Recipe shared successfully!');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getRecipeDetails = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.fullName = userService.findFullName();
        const recipeId = ctx.params.recipeId;

        recipeService.getRecipe(recipeId)
            .then(function (recipe) {

                const userId = userService.findUserId();
                recipe.isCreator = recipe._acl.creator === userId;
                ctx.recipe = recipe;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/recipe/details-recipe.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getEditRecipe = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.fullName = userService.findFullName();
        const recipeId = ctx.params.recipeId;

        recipeService.getRecipe(recipeId)
            .then(function (recipe) {

                ctx.recipe = recipe;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/recipe/edit-recipe.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postEditRecipe = function (ctx) {
        let { meal, ingredients, prepMethod, description, foodImageURL, category, likes } = ctx.params;
        ingredients = ingredients.split(',').map((i) => i.trim()).filter((i) => i !== '');

        if (meal.length < 4) {
            notifier.showError('The meal should be at least 4 characters long.');
        } else if (ingredients.length < 2) {
            notifier.showError('The ingredients should be at least 2 and separated by comma.');
        } else if (prepMethod.length < 10 || description.length < 10) {
            notifier.showError('The preparation method and description should be at least 10 characters long each.');
        } else if (!foodImageURL.startsWith('http://') && !foodImageURL.startsWith('https://')) {
            notifier.showError('The foodImageURL should start with "http://" or "https://".');
        } else if (!category) {
            notifier.showError('A single category should be selected.');
        } else {
            const categoryImageURL = categories[category];
            const data = { meal, ingredients, prepMethod, description, foodImageURL, category, categoryImageURL, likes: Number(likes) };
            const recipeId = ctx.params.recipeId;

            recipeService.editRecipe(recipeId, data)
                .then(function (res) {
                    notifier.showSuccess('Recipe edited successfully!');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const deleteRecipe = function (ctx) {
        const recipeId = ctx.params.recipeId;

        recipeService.deleteRecipe(recipeId)
            .then(function (res) {
                notifier.showSuccess('Your recipe was archived.');
                ctx.redirect('#/home');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const likeRecipe = function (ctx) {
        const recipeId = ctx.params.recipeId;

        recipeService.getRecipe(recipeId)
            .then(function (recipe) {
                recipe.likes++;

                recipeService.editRecipe(recipeId, recipe)
                    .then(function (res) {
                        notifier.showSuccess('You liked that recipe.');
                        ctx.redirect('#/home');
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getCreateRecipe,
        postCreateRecipe,
        getRecipeDetails,
        getEditRecipe,
        postEditRecipe,
        deleteRecipe,
        likeRecipe
    }
})();
