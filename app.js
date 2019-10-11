$(document).ready(function() {
    $("#stay-in").hide();
    $("#go-out").hide();

    $("#btn-in").on("click", function(e){
        e.preventDefault();
        $("#stay-in").show();
    })
})


