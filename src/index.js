function showForm() {
    const form = document.getElementById("addNewRecipe");
    const recipes = document.getElementById("viewRecipes");
    form.classList.remove("hidden");
    recipes.classList.add("hidden");
}