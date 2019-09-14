const recipeService = (function () {

    const createRecipe = function (recipe) {
        return requester.post('appdata', 'recipes', 'Kinvey', recipe);
    };

    const getAllRecipes = function () {
        return requester.get('appdata', 'recipes', 'Kinvey');
    };

    const getRecipe = function (recipeId) {
        return requester.get('appdata', `recipes/${recipeId}`, 'Kinvey');
    };

    const editRecipe = function (recipeId, recipe) {
        return requester.put('appdata', `recipes/${recipeId}`, 'Kinvey', recipe);
    };

    const deleteRecipe = function (recipeId) {
        return requester.del('appdata', `recipes/${recipeId}`, 'Kinvey');
    };

    return {
        createRecipe,
        getAllRecipes,
        getRecipe,
        editRecipe,
        deleteRecipe
    };
})();
