	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.spoonacular.com/recipes/search?query=cheese&number=2",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "fe381e8ebemshb5799e60e94bbc5p1e7f43jsn288204e353b0"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);
	});

	// var queryURL