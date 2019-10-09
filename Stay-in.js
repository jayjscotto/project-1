// Spoonacular Api
//     $.ajax({
//         url:"https://api.spoonacular.com/recipes/search?apiKey=ece8ad0d5fb1493e816a26b3044f185f&number=25&query=",


//         method: "GET"
//    }).then(function (response) {
//        console.log(response);
       
//    });



// Spoonacular Api
function getrecipe(itemId){
    console.log(itemId);
$.ajax({
    url:"https://api.spoonacular.com/recipes/search?apiKey=ece8ad0d5fb1493e816a26b3044f185f&number=25&query="+itemId,
    method: "GET"
}).then(function (res) {
    console.log(res)
   console.log('first response'+res );
   console.log('image soruce' + res.baseUri+res.results[0].image);
   
//    $("body").append(JSON.stringify(res));
   $("#output").html('<h3>'+res.results[0].title+ '</h3>');
   $("#sourceLink").html( '<img src=' +res.baseUri+res.results[0].image + '>' +
    '<br>ready in '+res.results[0].readyInMinutes + 'minutes');
   
        getsource(res.results[0].id);
        
   
   
});
}

function getsource(id) {
        $.ajax({
        url: "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=ece8ad0d5fb1493e816a26b3044f185f",
        method: "GET"
        }).then(function (res) {
            document.getElementById("sourceLink").innerHTMl = res.sourceUrl;
            document.getElementById("sourceLink").href = res.sourceUrl;
            console.log( res);
    });
}
