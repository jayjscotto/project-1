
$("#search-btn-restaurant").on("click", function(e) {
    e.preventDefault();
    restaurantSearch($("#restaurant-location").val());
})

function restaurantSearch(searchVal) {
    $("#restaurant-cards").empty();
    $("#recipe-cards").empty();

    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + searchVal;

    //set loading gif image
    let loadingGif = $("<img>").attr("src", "images/loading.gif")
    loadingGif.attr("id", "loading-gif");

    //set col where loading gif will appear
    let col = $("<div>").attr("class", "col text-center")
    col.attr("id", "loading-col");
    col.append(loadingGif);

    $("#restaurant-cards").append(col);

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
}
