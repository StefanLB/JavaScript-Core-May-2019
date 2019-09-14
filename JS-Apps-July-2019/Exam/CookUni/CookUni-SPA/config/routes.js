$(function () {
    Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        this.get('#/user/register', userController.getRegister);
        this.post('#/user/register', userController.postRegister);

        this.get('#/user/login', userController.getLogin);
        this.post('#/user/login', userController.postLogin);

        this.get('#/user/logout', userController.logout);

        this.get('#/recipe/create', recipeController.getCreateRecipe);
        this.post('#/recipe/create', recipeController.postCreateRecipe);

        this.get('#/recipe/details/:recipeId', recipeController.getRecipeDetails);

        this.get('#/recipe/edit/:recipeId', recipeController.getEditRecipe);
        this.post('#/recipe/edit/:recipeId', recipeController.postEditRecipe);

        this.get('#/recipe/delete/:recipeId', recipeController.deleteRecipe);
        this.get('#/recipe/like/:recipeId', recipeController.likeRecipe);
    }).run('/');
});
