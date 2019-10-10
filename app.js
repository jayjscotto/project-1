<<<<<<< HEAD
<<<<<<< HEAD
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
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
=======
//comment
=======
$(document).ready(function() {
    $("#stay-in").hide();
    $("#go-out").hide();
>>>>>>> 21859403fa56301618071b9b07ae345ed06c7fab

    $("#btn-in").on("click", function(e){
        e.preventDefault();
        $("#stay-in").show();
    })
})


<<<<<<< HEAD
//counts from one up to ten
function count() {
    for (let i = 0; i < 10; i ++) {
        console.log(i);
    }
} 

//call count function
count();
>>>>>>> bd20ca846f5123479e330295981d9edbd0fd6787
=======
>>>>>>> 21859403fa56301618071b9b07ae345ed06c7fab
