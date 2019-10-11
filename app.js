$(document).ready(function() {
    $("#stay-in").hide();
    $("#go-out").hide();

    $("#btn-in").on("click", function(e){
        e.preventDefault();
        $("#stay-in").show();
    })

    ///////QUICK SEARCH:
    $("#search-both").on("click", function(e) {
        //prevent default
        e.preventDefault();
        e.stopPropagation();

        //console log to check the value that determines which ajax call we are using
        console.log($("#quick-search").val());

        //conditional statement that chooses the ajax call
        if ($("#quick-search").val() === "Stay In") {
            $("#stay-in").show();
            //use ajax call from stay-in.js
            let mainIngridient = $("#quick-search-val").val();

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
                    let col = $("<div>").attr("class", "col-4 mx-auto text-align-center");
            
                    //hyperlink for each card image and title
                    let link = $("<a>").attr("href", resultsArr[i].recipe.url);
                    link.attr("style", "color:inherit");
                    link.attr("class", "mx-auto text-align-center")
                    
                    //defines card element from bootstrap
                    let card = $("<div>").attr("class", "card mx-auto my-3 text-align-center");
                    card.attr("style", "width: 25rem; height: 35rem")
            
            
                    //recipe image
                    let recipeImage = $("<img>").attr("src", resultsArr[i].recipe.image);
                    recipeImage.attr("height", "150");
                    recipeImage.attr("width", "250");
                    recipeImage.attr("class", "mx-auto");
            
                    //recipe title
                    let recipeTitle = $("<h5>").attr("class", "card-title mx-auto text-align-center");
                    recipeTitle.text(resultsArr[i].recipe.label);
            
                    //ingridients list to be added to each card
                    let listDiv = $("<div>").attr("style", "overflow:scroll");
                    let itemList = $("<ul>");

                    let ingredientsArr = resultsArr[i].recipe.ingredients;
                    console.log(resultsArr[i].recipe.ingredients);

                    //for loop to add ingridients list to each card
                    for (let j = 0; j < ingredientsArr.length; j++) {
                        let newLi = $("<li>");
                        let ingredient = ingredientsArr[j].text;
                        console.log(ingredient);
                        newLi.text(ingredient);
                        itemList.append(newLi);
                        console.log(newLi);
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
            
                });

                    
        } else if ($("#quick-search").val() === "Go Out") {
                    //use ajax call from outlog.js with select() function and search value parameter
                    select($("#quick-search-val").val());
                    //TODO: show the restaurant search results area
                } else {
                    //modal to explain quick search?
                }
    });
})





