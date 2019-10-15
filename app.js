// set UI classes and function--- not working 
const loggedOutLinks = $(".logged-out");
const loggedInLinks = $(".logged-in");
const accountInfo = $("#account-info");

function setUI (user){
    if (user) {
        //toggle UI elements
        loggedInLinks.show();
        loggedOutLinks.hide();
        //account info
        const loggedIn = $("<div>").text(`Account Username: ${user.email}`).attr("class", "text-center");
        accountInfo.append(loggedIn);
    } else {
        //toggle UI elements
        loggedOutLinks.show();
        loggedInLinks.hide();
        //hide account info:
        accountInfo.empty();
    }
}



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

        recipeSearch($("#quick-search-val").val());

    } else if ($("#quick-search").val() === "Go Out") {
        $("#stay-in").hide();
        $("#recipe-cards").hide();
        $("#restaurant-cards").show();
        $("#go-out").show();

        restaurantSearch($("#quick-search-val").val());
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


