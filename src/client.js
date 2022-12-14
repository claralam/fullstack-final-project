$(document).ready(function () {
    
    const apiServer = 'http://localhost:3005';

    let allRecipes = [];
    let currentRecipe = undefined;
    getRecipes();
    // getCurrentRecipe();

    // Gets list of recipes
    function getRecipes() {
        $.getJSON(apiServer + '/recipes', (recipes) => {
            console.log(recipes);
            allRecipes = recipes;
            let recipeGrid = '';
            if (allRecipes.length === 0) {
                recipeGrid = '<h3>No recipes currently. Try adding one!</h3>';
            } else {
                recipes.forEach((r) => {
                    recipeGrid += `
                    <div class="flex-col shadow-xl rounded-lg p-10 bg-white hover:cursor-pointer" onclick="location.href = 'frenchfries.html';">
                        <img src="${r.imageLocation}" class="w-full h-1/2 object-cover my-4">
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

    $('#formUpload').submit((event) => {
        // Double check and see if this is needed?
        // event.preventDefault();
        console.log("Submmited: ", $('#formUpload')[0])
        const data = new FormData($('#formUpload')[0]);

        $.ajax({
            
        })
    })



    // $("#formUpload").submit((event) => {
    //     event.preventDefault();
    //     const data = new FormData($('#formUpload')[0]);
    //     console.log("here")
    //     console.log(data)

    //     // Adds button spinner
    //     // let spinner = '<div class="spinner-border text-primary" role="status">' 
    //     // spinner += '<span class="visually-hidden">Loading...</span></div>';
    //     // $('#uploadButton').html(spinner);

    //     // let submitButton = '<button id="submitMeme" type="submit" class="btn btn-primary mb-3">Upload Cat Picture</button>';
        
    //     $.ajax({
    //         url: apiServer + 'upload/',
    //         type: 'POST',
    //         contentType: false,
    //         processData: false,
    //         cache: false,
    //         data: data,
    //         success: (res) => {
    //             getCurrentRecipe();
    //             console.log('Success!', res);
    //             // setTimeout(() => {
    //             //     $('#uploadButton').html(submitButton);
    //             //     $('#v-pills-create-tab').click();
    //             // }, 2000);
    //         },
    //         error: () => {
    //             alert('Error: In sending the request!');
    //             // $('#uploadButton').html(submitButton);
    //         }
    //     });

    //     // function getCurrentRecipe() {
    //     //     $.getJSON(apiServer + 'currentrecipe/', (recipe) => {
    //     //         if (!recipe || !recipe.mimetype) {
    //     //             currentRecipe = undefined;
    //     //             $('#displayCurrentRecipe').html('<h1>No Current Recipes</h1>');
    //     //         } else {
    //     //             currentRecipe = recipe;
    //     //             $('#displayCurrentRecipe.recipeName').append(currentRecipe.recipeName)
    //     //             $('#displayCurrentRecipe.ingredients').append(currentRecipe.ingredients)
    //     //             $('#displayCurrentRecipe.instructions').append(currentRecipe.instructions)
    //     //         }
    //     //     });
    //     // }
    // });

    // // Potentially use for getRecipes();
    // // function loadRecipes() {
    // //     console.log("hiiiiiii")
    // //     for (let i = 0; i < recipes.length; i++) {
    // //         let currRecipe = recipes[i];
    // //         console.log(currRecipe);
    // //     }
    // // }
});