$(document).ready(function () {
    'use strict';

    const express = require('express');
    const cors = require('cors');
    // const multer = require('multer')
    const fs = require('fs');
    // const memeLib = require("./memeGenerator.js");
    // const upload = multer({ dest: './images/' })

    const app = express();
    const port = 3005;

    let recipes = [];
    let currentRecipe = '{}';
    let stagedRecipeData = '';

    app.use(cors({
        origin: 'http://localhost:3000'
    }));
    app.use(express.json());
    // The images directory that is served as a static server
    // app.use('/images', express.static('images'));


    // Gets all recipes
    app.get('/recipes/', (req, res) => {
        res.send(recipes);
    });


    // Adds a new recipe to the book
    app.post('/upload/', (req, res) => {
        currentRecipe = req.body;
        const findRecipe = recipes.find(f => f.recipeName.toLowerCase() === currentRecipe.recipeName.toLowerCase());
        if (findRecipe) {
            res.send('This recipe already exists.')
        } else {
            recipes.push(currentRecipe)
            fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));
            res.send(`Adding recipe to book: ${currentRecipe.recipeName}`)
            console.log(recipes)
        }
    });

    // Edits a recipe
    app.put('/edit', (req, res) => {
        currentRecipe = req.body;
        const findRecipe = recipes.find(f => f.recipeName.toLowerCase() === currentRecipe.recipeName.toLowerCase());
        if (findRecipe) {
            recipes = recipes.filter((recipe) => { return recipe.recipeName.toLowerCase() !== currentRecipe.recipeName.toLowerCase() });
            recipes.push(currentRecipe);
            console.log(recipes)
            fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));
            console.log(recipes)
            res.send('Editing recipe: ' + currentRecipe.recipeName);
        } else {
            res.send("Recipe does not exist.");
        }
    });

    // Deletes a recipe
    app.delete('/delete', (req, res) => {
        const removeRecipe = req.body;
        if (removeRecipe) {
            recipes = recipes.filter((recipe) => { return recipe.recipeName.toLowerCase() !== removeRecipe.recipeName.toLowerCase() });
            fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));
            res.send('Removed recipe: ' + removeRecipe.recipeName);
            console.log(recipes);
        }
    });

    app.listen(port, () => {
        if (!fs.existsSync('./data/')) {
            fs.mkdirSync('./data');
            console.log('Created data directory');
        }
        const recipesFile = './data/recipes.json';
        if (fs.existsSync(recipesFile)) {
            const rawData = fs.readFileSync(recipesFile);
            recipes = JSON.parse(rawData);
        } else {
            // File doesn't exist so create it
            fs.writeFileSync('./data/recipes.json', JSON.stringify(recipes));
        }
        console.log(recipes)
        console.log("length: ", recipes.length)
        console.log(`Loaded ${recipes.length} recipes!`);
        
        const currentFile = './data/currentRecipe.json';
        if (fs.existsSync(currentFile)) {
            const rawData = fs.readFileSync('./data/currentRecipe.json');
            currentRecipe = JSON.parse(rawData);
        } else {
            fs.writeFileSync('./data/currentMeme.json', currentRecipe);
        }
        console.log('Loaded currentRecipe!', currentRecipe);
        console.log('Recipe API listening on port ' + port);
    });

    loadRecipes()

    const apiServer = 'http://localhost:3005/';

    // getRecipes();
    // getCurrentRecipe();

    $("#formUpload").submit((event) => {
        event.preventDefault();
        const data = new FormData($('#formUpload')[0]);
        console.log("here")
        console.log(data)

        // Adds button spinner
        // let spinner = '<div class="spinner-border text-primary" role="status">' 
        // spinner += '<span class="visually-hidden">Loading...</span></div>';
        // $('#uploadButton').html(spinner);

        // let submitButton = '<button id="submitMeme" type="submit" class="btn btn-primary mb-3">Upload Cat Picture</button>';
        
        $.ajax({
            url: apiServer + 'upload/',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            success: (res) => {
                getCurrentRecipe();
                console.log('Success!', res);
                // setTimeout(() => {
                //     $('#uploadButton').html(submitButton);
                //     $('#v-pills-create-tab').click();
                // }, 2000);
            },
            error: () => {
                alert('Error: In sending the request!');
                // $('#uploadButton').html(submitButton);
            }
        });

        function getCurrentRecipe() {
            $.getJSON(apiServer + 'currentrecipe/', (recipe) => {
                if (!recipe || !recipe.mimetype) {
                    currentRecipe = undefined;
                    $('#displayCurrentRecipe').html('<h1>No Current Recipes</h1>');
                } else {
                    currentRecipe = recipe;
                    $('#displayCurrentRecipe.recipeName').append(currentRecipe.recipeName)
                    $('#displayCurrentRecipe.ingredients').append(currentRecipe.ingredients)
                    $('#displayCurrentRecipe.instructions').append(currentRecipe.instructions)
                }
            });
        }
    });
});

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

function loadRecipes() {
    console.log("hiiiiiii")
    for (let i = 0; i < recipes.length; i++) {
        let currRecipe = recipes[i];
        console.log(currRecipe);
    }
}