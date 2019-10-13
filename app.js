
$(document).ready(function() {
    $("#stay-in").hide();
    $("#go-out").hide();


    $("#btn-in").on("click", function(e){
        e.preventDefault();
        $("#go-out").hide();
        $("#stay-in").show();
    })

    $("#btn-out").on("click", function(e){
        e.preventDefault();
        $("#stay-in").hide();
        $("#go-out").show();
    })

    ///////QUICK SEARCH:
    $("#search-both").on("click", function(e) {
        //prevent default
        e.preventDefault();
        e.stopPropagation();


        $("#restaurant-cards").empty();
        $("#recipe-cards").empty();
        
         //set loading gif image
         let loadingGif = $("<img>").attr("src", "images/loading.gif")
         loadingGif.attr("id", "loading-gif");

         //set col where loading gif will appear
         let col = $("<div>").attr("class", "col text-center")
         col.attr("id", "loading-col");
         col.append(loadingGif);

        //conditional statement that chooses the ajax call
        if ($("#quick-search").val() === "Stay In") {
           
            $("#go-out").hide();
            $("#restaurant-cards").hide();

            $("#stay-in").show();
            $("#recipe-cards").show();

            //append loading col to the cards area to display when loading ajax response
            $("#recipe-cards").append(col);
            //use ajax call from stay-in.js
            let mainIngridient = $("#quick-search-val").val();

            //Edamam API info
            const APIkey = "a8f82bad4a3cd7ae69e3468a1f8e22d2";
            const appID = "d2dacec9";
            const queryURL = `https://api.edamam.com/search?q=${mainIngridient}&app_id=${appID}&app_key=${APIkey}`;

     
            //ajax call to get information from Edamam
            $.ajax({
                url: queryURL,
                method: "GET",
                contentType: "application/json",
            }).then(function(response) {
                console.log(response)
                //remove loading gif
                $("#loading-col").detach();
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
                    card.attr("style", "width: 25rem; height: 25rem")
            
            
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
            $("#stay-in").hide();
            $("#recipe-cards").hide();
            $("#restaurant-cards").show();
            $("#go-out").show();

            $("#restaurant-cards").append(col);

            //use ajax call from outlog.js with select() function and search value parameter
            console.log($("#quick-search-val").val())
            let searchVal = $("#quick-search-val").val();
            //TODO: show the restaurant search results area
            var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + searchVal;

            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    "user-key": "85b611ff124684e64a5eee0c57b6192c"
                }
            }).then(function(data) {
                console.log(data)
                //get coordinates of first suggested city
                var cityId = data.location_suggestions[0].id;

                //second query url
                var queryTwoURL = `https://developers.zomato.com/api/v2.1/location_details?entity_id=${cityId}&entity_type=city`;
    
                $.ajax({
                    url: queryTwoURL,
                    method: "GET",
                    headers: {
                        "user-key": "85b611ff124684e64a5eee0c57b6192c"
                    }
                }).then(function(response) {
                    $("#loading-col").detach();
                    console.log(response);

                    //get best rated restaurants list
                    let resultsArr = response.best_rated_restaurant;

                    
                    console.log(resultsArr)
                    //for loop to work with top 10 restaurants
                    for (let i = 0; i < resultsArr.length; i++) {
                        //new col for each card

                        console.log(resultsArr[i])
                        let col = $("<div>").attr("class", "col-5 mx-auto text-align-center");

                        //new card for each restaurant
                        let card = $("<div>").attr("class", "card mx-auto my-4");

                        //restaurant img
                        let restaurantImage = $("<img>").attr("src", resultsArr[i].restaurant.photos[0].photo.url);	
                        restaurantImage.attr("height", "150");	
                        restaurantImage.attr("width", "250");	
                        restaurantImage.attr("class", "mx-auto");

                        //restaurant name
                        let link = $("<a>").attr("href", resultsArr[i].restaurant.menu_url);
                        let restaurantTitle = $("<h5>").attr("class", "card-title mx-auto text-align-center");	
                        restaurantTitle.text(resultsArr[i].restaurant.name);
                        link.append(restaurantTitle);
                        
                        //cuisine types
                        let cuisines = $("<p>").text(resultsArr[i].restaurant.cuisines);

                        

                        //avg cost for two
                        let avgCost = $("<p>").text(`Average cost for two: ${resultsArr[i].restaurant.average_cost_for_two}`);

                        //address
                        let address = $("<p>").text(resultsArr[i].restaurant.location.address);

                        card.append(restaurantImage, link, cuisines, avgCost, address);
                        col.append(card);
                        $("#restaurant-cards").append(col);
                    }

                })
                })
        } else {
                    console.log('quick search false')
                }
    });

    //accordion code
    var acc = document.getElementsByClassName("accordion");

    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } 
        });
      }
})


