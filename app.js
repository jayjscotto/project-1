$(document).ready(function() {
    //import { recipeSearch } from './Stay-in.js';

    $("#stay-in").hide();
    $("#go-out").hide();

    //show recipe search fields and results
    $("#btn-in").on("click", function(e){
        e.preventDefault();
        $("#stay-in").show();
    })

    //show restaurant search fields and results
    $("#btn-out").on("click", function(e){
        e.preventDefault();
        //include code for showing restaurant search fields and results
    })

    //when the user utilizes the quick search
    //they can select whether they are searching to stay in or go out
    $("#search-both").on("click", function(e) {
        //prevent default
        e.preventDefault();
        e.stopProp
        //console log to check the value that determines which ajax call we are using
        console.log($("#quick-search").val());

        //conditional statement that chooses the ajax call
        if ($("#quick-search").val() === "Stay In") {
            //use ajax call from stay-in.js
            //recipeSearch($("#quick-search-val").val());
            //show the recipe search results area
            $("#stay-in").show();
        } else if ($("#quick-search").val() === "Go Out") {
            //use ajax call from outlog.js with select() function and search value parameter
            select($("#quick-search-val").val());
            //TODO: show the restaurant search results area
        } else {
            //modal to explain quick search?
        }
    })
})


