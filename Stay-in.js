 //click listener for the search button
 $("#search-btn").on("click", function() {
    event.preventDefault();
    //value of search input
    let mainIngridient = $("#search-value").val();

    //Edamam API info
    const APIkey = "a8f82bad4a3cd7ae69e3468a1f8e22d2";
    const appID = "d2dacec9";
    const queryURL = `https://api.edamam.com/search?q=${mainIngridient}&app_id=${appID}&app_key=${APIkey}`

    //ajax call to get information from Edamam
    $.ajax({
        url: queryURL,
        method: "GET",
        contentType: "application/json"
    }).then(function(response) {
        console.log(response)
        //variable for the results array
        let resultsArr = response.hits;

        //for loop to append each result from the list
        for (let i = 0; i < resultsArr.length; i++) {
            
            //sets a row for each card
            let col = $("<div>").attr("class", "col-3 mx-auto");
    
            //hyperlink for each card image and title
            let link = $("<a>").attr("href", resultsArr[i].recipe.url);
            link.attr("style", "color:inherit");
            
            //defines card element from bootstrap
            let card = $("<div>").attr("class", "card mx-auto");
            card.attr("style", "width: 18rem;")
    
    
            //recipe image
            let recipeImage = $("<img>").attr("src", resultsArr[i].recipe.image);
            recipeImage.attr("height", "150");
            recipeImage.attr("width", "150");
            recipeImage.attr("class", "mx-auto");
    
            //recipe title
            let recipeTitle = $("<h5>").attr("class", "card-title");
            recipeTitle.text(resultsArr[i].recipe.label);
    
            //ingridients list to be added to each card
            let itemlist = $("<p>");
            let ingredientsArr = resultsArr[i].recipe.ingredientLines;
            itemlist.text(`Ingredients: ${ingredientsArr}`);
    
            ////////////THIS CODE DOESN'T WORK//////////////////
        
            //for loop to add ingridients list to each card
            for (let j = 0; j < ingredientsArr; j++) {
                let newLi = $("<li>");
    
                let ingredient = ingredientsArr[j];
                ingredient.text(ingredientsArr[j]);
    
                newLi.append(ingredient);
    
                itemlistUL.append(newLi);
    
                console.log(newLi)
            }

            ///////// Everything else here works //////////////

            //adds link to recipe and ingridents to the card
            card.append(link, itemlist);
            //adds the image and recipe title to the link
            link.append(recipeImage, recipeTitle);
            //adds the card to the row
            //adds the row to the body
            $("#recipe-cards").append(col);

            //because this is a for loop
            //a row, and a card will be created every time the loop iterates...
            //essentially: each recipe gets it's own card and row.. (for now)
        }
        //end of for loop
    });
    //end of ajax call && promise
}) //end of click listener
