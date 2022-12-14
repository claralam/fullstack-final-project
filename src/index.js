function showForm() {
    const form = document.getElementById("addNewRecipe");
    const recipes = document.getElementById("viewRecipes");
    form.classList.remove("hidden");
    recipes.classList.add("hidden");
}

function showRecipes() {
    const form = document.getElementById("addNewRecipe");
    const recipes = document.getElementById("viewRecipes");
    form.classList.add("hidden");
    recipes.classList.remove("hidden");
}

function deleteFries() {
    confirm('This permanently deletes the recipe. Are you sure?');
    location.href = "test.html"
}