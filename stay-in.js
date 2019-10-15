//click listener for the search button	
$("#search-btn-recipe").on("click", function(e) {	
    e.preventDefault();	
    // $("#recipe-cards").empty();	
    // $("#restaurant-results").empty();
    // $("#recipe-results").empty();

    recipeSearch($("#main-ingredient").val());
})


    function recipeSearch(searchVal) {
        //empty correct divs
        $("#recipe-cards").empty();	
        $("#restaurant-results").empty();
        $("#recipe-results").empty();

        //value of search input
        let mainIngridient = searchVal	
        // let mealType = $("#meal-type-select").val();
        // let cuisineType = $("#cuisine-select").val();
        // let health = $("#dietary-select").val();

        //set loading gif image
        let loadingGif = $("<img>").attr("src", "images/loading.gif")
        loadingGif.attr("id", "loading-gif");
        //set col where loading gif will appear
        let col = $("<div>").attr("class", "col text-center")
        col.attr("id", "loading-col");
        col.append(loadingGif);

        $("#recipe-cards").append(col);

        //appending results and add to favorites button
        let firstCol = $("<div>").attr("class", "col text-center mx-auto");
        let favButton = $("<button>").attr("class", "btn btn-outline-success text-center mx-auto");
        favButton.text("Add to Favorites");
        favButton.attr("data-name", searchVal);
        favButton.attr("id", "add-recipe-favorite");
        //listener to add to favorites
        favButton.on("click", function(e){
            e.preventDefault();
            addRecipeFavorite(searchVal);
        })

        let results = $("<h3>").attr("class", "text-center mx-auto").text("Results");
        
        firstCol.append(results, favButton);
        $("#recipe-results").append(firstCol);
    
        //Edamam API info	
        const APIkey = "a8f82bad4a3cd7ae69e3468a1f8e22d2";	
        const appID = "d2dacec9";	
        const queryURL = `https://api.edamam.com/search?app_id=${appID}&app_key=${APIkey}&q=${mainIngridient}`

        //ajax call to get information from Edamam	
        $.ajax({	
            url: queryURL,	
            method: "GET",
            contentType: "application/json"
        }).then(function(response) {	
            //console.log(response)	

            $("#loading-col").detach();
            //variable for the results array	
            let resultsArr = response.hits;	

            //for loop to append each result from the list	
            for (let i = 0; i < resultsArr.length; i++) {	

                //sets a col for each card	
                let col = $("<div>").attr("class", "col-4 mx-auto text-align-center");	

                //hyperlink for each card image and title	
                let link = $("<a>").attr("href", resultsArr[i].recipe.url);	
                link.attr("style", "color:inherit");	
                link.attr("class", "mx-auto text-align-center")	

                //defines card element from bootstrap	
                let card = $("<div>").attr("class", "card mx-auto my-3 p-3");	
                card.attr("style", "width: 25rem; height: 30rem; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);");

                //recipe image	
                let recipeImage = $("<img>").attr("src", resultsArr[i].recipe.image);	
                recipeImage.attr("height", "225");	
                recipeImage.attr("width", "300");	
                recipeImage.attr("class", "mx-auto");	

                //recipe title	
                let recipeTitle = $("<h5>").attr("class", "card-title mx-auto text-center");	
                recipeTitle.text(resultsArr[i].recipe.label);	

                //ingridients list to be added to each card	
                let listDiv = $("<div>").attr("style", "overflow:scroll");	
                let itemList = $("<ul>");	

                let ingredientsArr = resultsArr[i].recipe.ingredients;	

                //for loop to add ingridients list to each card	
                for (let j = 0; j < ingredientsArr.length; j++) {	
                    let newLi = $("<li>");	
                    let ingredient = ingredientsArr[j].text;	
                    newLi.text(ingredient);	
                    itemList.append(newLi);	
                }	

                listDiv.append(itemList);	

                //adds link to recipe and ingridents to the card	
                card.append(link, listDiv);	
                //adds the image and recipe title to the link	
                link.append(recipeImage, recipeTitle);	
                //adds the card to the row	
                //adds the row to the body	
                col.append(card);	
                $("#recipe-cards").append(col);	
            }	
            //end of for loop	
        });
    }	
