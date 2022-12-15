$(document).ready(function () {
    
    const apiServer = 'http://localhost:3005/api/';

    let allRecipes = [];
    let currentRecipe;
    getRecipes();
    
    // Gets list of recipes
    function getRecipes() {
        $.getJSON(apiServer + 'recipes', (recipes) => {
            allRecipes = recipes;
            let recipeGrid = '';
            if (allRecipes.length === 0) {
                recipeGrid = '<h3>No recipes currently. Try adding one!</h3>';
            } else {
                recipes.forEach((r) => {
                    recipeGrid += `
                    <div id=${r.recipeName} class="flex-col shadow-xl rounded-lg p-10 bg-white hover:cursor-pointer recipe";">
                        <div class="flex flex-col relative space-y-3 lg:mb-0">
                            <h1 class="text-3xl font-semibold">${r.recipeName}</h1>
                            <p>${r.time} min</p>
                            <p>${r.description}</p>
                        </div>
                    </div>`;
                })
            }

            $('#recipeGrid').html(recipeGrid);
        })
    };

    // Gets the recipe clicked on
    $(document).on("click", ".recipe", function () {
        getCurrentRecipe($(this).attr('id'))
     });

    function getCurrentRecipe(recipeName) {
        $('#addNewRecipe').css('display', 'none');
        $('#viewRecipes').css('display', 'none');
        document.getElementById("displayCurrentRecipeArea").classList.remove("hidden");
        
        let recipeDetails;
        
        $.getJSON(apiServer + `recipes/${recipeName}`, (recipe) => {
            currentRecipe = recipe;
            recipeDetails = `
                <h1 id="recipeName" class="text-4xl font-semibold">${recipe.recipeName}</h1>
                <p id="time" class="text-lg"><span class="font-semibold">Estimated time:</span> ${recipe.time} min</p>
                <p id="description" class="text-lg"><span class="font-semibold">Description:</span> ${recipe.description}</p>
                <p id="ingredients" class="text-lg"><span class="font-semibold">Ingredients:</span> ${recipe.ingredients}</p>
                <p id="instructions" class="text-lg"><span class="font-semibold">Instructions:</span> ${recipe.instructions}</p>
            `
        }).done(function(response) {
            $('#displayCurrentRecipe').html(recipeDetails);
        }).fail(function(response) {
            location.reload();
            alert('Error: Could not find recipe');
        });
    }

    // For POST request
    $('#formUpload').submit((event) => {
        event.preventDefault();
        // const data = new FormData($('#formUpload')[0])

        const recipeName = $('#recipeName').val()
        const time = $('#time').val()
        const description = $('#description').val()
        const ingredients = $('#ingredients').val()
        const instructions = $('#instructions').val()

        const data = {
            recipeName: recipeName,
            time: time,
            description: description,
            ingredients: ingredients,
            instructions: instructions
        }

        $.post(`${apiServer}upload`,
            data
        ).done(function(response) {
            console.log('Success!', response);
            location.reload();
        }).fail(function(response) {
            alert('Error: In sending the request!');
        });

    //     $.ajax({
    //         url: apiServer + 'upload',
    //         type: 'POST',
    //         contentType: false,
    //         processData: false,
    //         cache: false,
    //         body: data,
    //         success: (res) => {
    //             console.log('Success!', res);
    //         },
    //         error: () => {
    //             alert('Error: In sending the request!');
    //         }
    //     });
    });

    // Prepopulate edit form
    $(document).on("click", "#edit", function () {
        let cancelButton = `<button id="cancel" class="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">Cancel</button>`

        $('#edit').replaceWith(cancelButton);
        $('#displayCurrentRecipe').html('')
        document.getElementById("editFormArea").classList.remove("hidden");
        $('#recipeName-edit').val(currentRecipe.recipeName);
        $('#time-edit').val(currentRecipe.time);
        $('#description-edit').html(currentRecipe.description);
        $('#ingredients-edit').html(currentRecipe.ingredients);
        $('#instructions-edit').html(currentRecipe.instructions);
    });

    // Cancel editing
    $(document).on("click", "#cancel", function () {
        let editButton = `<button id="edit" class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">Edit Recipe</button>`
        let recipeDetails = `
                <h1 id="recipeName" class="text-4xl font-semibold">${currentRecipe.recipeName}</h1>
                <p id="time" class="text-lg"><span class="font-semibold">Estimated time:</span> ${currentRecipe.time} min</p>
                <p id="description" class="text-lg"><span class="font-semibold">Description:</span> ${currentRecipe.description}</p>
                <p id="ingredients" class="text-lg"><span class="font-semibold">Ingredients:</span> ${currentRecipe.ingredients}</p>
                <p id="instructions" class="text-lg"><span class="font-semibold">Instructions:</span> ${currentRecipe.instructions}</p>
            `
        $('#cancel').replaceWith(editButton);
        document.getElementById("editFormArea").classList.add("hidden");
        $('#displayCurrentRecipe').html(recipeDetails);
    });

    // For PUT request    
    $('#editForm').submit( event => {
        event.preventDefault();

        const recipeName = $('#recipeName-edit').val()
        const time = $('#time-edit').val()
        const description = $('#description-edit').val()
        const ingredients = $('#ingredients-edit').val()
        const instructions = $('#instructions-edit').val()

        const data = {
            recipeName: recipeName,
            time: time,
            description: description,
            ingredients: ingredients,
            instructions: instructions
        }

        $.ajax({
            url: apiServer + 'edit/' + currentRecipe.recipeName,
            type: 'PUT',
            data: data,
            success: (res) => {
                console.log('Success!', res);
            },
            error: (res) => {
                alert(`Error: In sending the request!, ${res}`);
            }
        });
    });

    // For DELETE 
    $(document).on("click", "#delete", function () {
        const deleteRecipe = confirm("Are you sure? This permanently deletes the recipe.");
        if (deleteRecipe) {
            $.ajax({
                url: apiServer + 'delete/' + currentRecipe.recipeName,
                type: 'DELETE',
                success: (res) => {
                    console.log('Success!', res);
                    location.reload();
                },
                error: () => {
                    alert('Error: In sending the request!');
                }
            });
        };
    });
});